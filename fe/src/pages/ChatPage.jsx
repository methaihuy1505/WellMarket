// src/pages/ChatPage.jsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import ChatList from "../components/Chat/ChatList";
import ChatWindow from "../components/Chat/ChatWindow";
import Header from "../components/Layout/Header";
import { echo } from "../echo";
import { useUser } from "../contexts/UserContext";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const receiverIdParam = searchParams.get("receiver_id");
  const postIdParam = searchParams.get("post_id");

  const { user } = useUser();
  const authId = user?.id;

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  // Ref để lưu trữ ID của các hội thoại đã subscribe, tránh subscribe lại
  const subscribedIdsRef = useRef(new Set());

  // Ref để activeConversation luôn mới nhất trong listener mà không cần đưa vào dependency
  const activeConvRef = useRef(null);
  const [incomingMessage, setIncomingMessage] = useState(null);
  useEffect(() => {
    activeConvRef.current = activeConversation;
  }, [activeConversation]);

  // Load danh sách hội thoại
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await api.get("/conversations");
        const list = Array.isArray(res.data) ? res.data : res.data.data;
        setConversations(list || []);

        if (receiverIdParam) {
          const res2 = await api.post("/conversations/find-or-create", {
            receiver_id: Number(receiverIdParam),
          });
          const newConv = res2.data;
          setActiveConversation(newConv);
          setConversations((prev) => {
            if (!prev.find((c) => c.id === newConv.id))
              return [newConv, ...prev];
            return prev;
          });
        } else if (list && list.length > 0) {
          const latest = list
            .slice()
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
          setActiveConversation(latest);
        }
      } catch (err) {
        console.error("Lỗi load conversations:", err);
      }
    };
    loadConversations();
  }, [receiverIdParam]);

  // --- LOGIC REALTIME ĐÃ SỬA ---
  useEffect(() => {
    if (!authId || conversations.length === 0) return;

    conversations.forEach((conv) => {
      if (!subscribedIdsRef.current.has(conv.id)) {
        console.log(`📡 Đang lắng nghe conversation.${conv.id}`);
        subscribedIdsRef.current.add(conv.id);

        const channel = echo.private(`conversation.${conv.id}`);

        channel.listen(".message.sent", (payload) => {
          console.log("🔔 Socket nhận tin:", payload);
          const newMessage = payload.message;

          // 1. Cập nhật Sidebar (Logic cũ giữ nguyên)
          setConversations((prev) => {
             // ... (giữ nguyên logic cập nhật list và unread của bạn) ...
             const existingIndex = prev.findIndex(c => c.id === newMessage.conversation_id);
             if (existingIndex === -1) return prev;
 
             const updatedConv = { ...prev[existingIndex] };
             updatedConv.last_message = newMessage;
             updatedConv.updated_at = newMessage.created_at;
 
             const isActive = activeConvRef.current && activeConvRef.current.id === newMessage.conversation_id;
             const isMe = newMessage.sender_id === authId;
 
             if (!isActive && !isMe) {
               updatedConv.unread = true;
             } else {
                updatedConv.unread = false;
             }
 
             const newList = [...prev];
             newList.splice(existingIndex, 1);
             return [updatedConv, ...newList];
          });

          // Nếu tin nhắn thuộc hội thoại đang mở, lưu vào state để truyền xuống
          // Dùng activeConvRef để đảm bảo lấy đúng ID đang mở
          if (activeConvRef.current && activeConvRef.current.id === newMessage.conversation_id) {
             setIncomingMessage(newMessage);
          }
        });
      }
    });
    
    // KHÔNG return cleanup function để unsubscribe ở đây
    // Vì ChatPage cần nghe mãi mãi cho đến khi tắt trang web
  }, [conversations, authId]);
  // Lưu ý: Dù vẫn để conversations ở dependency, nhưng nhờ check `subscribedIdsRef`
  // nên ta sẽ không gọi echo.private lại nhiều lần.

  const handleSelectConversation = async (conv) => {
    setActiveConversation(conv);
    // UI update immediate
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
    );
    if (conv.unread) {
      try {
        await api.post(`/conversations/${conv.id}/mark-read`);
      } catch (e) {}
    }
  };

  const handleMessageSent = (msg) => {
    setConversations((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === msg.conversation_id);
      if (existingIndex === -1) return prev;
      const updatedConv = { ...prev[existingIndex] };
      updatedConv.last_message = msg;
      updatedConv.updated_at = msg.created_at;
      updatedConv.unread = false;
      const newList = [...prev];
      newList.splice(existingIndex, 1);
      return [updatedConv, ...newList];
    });
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-gray-100 overflow-y-auto border-r border-gray-200">
          <ChatList
            onSelect={handleSelectConversation}
            activeId={activeConversation?.id}
            conversations={conversations}
          />
        </div>
        <div className="flex-1 overflow-hidden bg-white">
          {activeConversation ? (   
            <ChatWindow
              conversation={activeConversation}
              postId={postIdParam ? Number(postIdParam) : null}
              onMessageSent={handleMessageSent}
              // TRUYỀN PROPS MỚI XUỐNG
              incomingMessage={incomingMessage} 
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Chọn một đoạn hội thoại để bắt đầu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
