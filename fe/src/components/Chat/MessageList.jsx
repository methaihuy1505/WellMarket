// src/components/chat/MessageList.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../../utils/api";
import MessageItem from "./MessageItem";
// QUAN TRỌNG: Không import echo ở đây nữa

const LIMIT = 20;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function MessageList({
  conversationId,
  currentUserId,
  newMessageProp, // Tin nhắn mình vừa gửi (từ MessageInput)
  incomingMessageProp, // Tin nhắn người khác gửi (từ Socket -> ChatPage -> ChatWindow)
}) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const initialScrollDoneRef = useRef(false);
  const containerRef = useRef(null);

  // 1. Reset và load tin nhắn cũ khi đổi hội thoại
  useEffect(() => {
    if (!conversationId) return;
    setMessages([]);
    setHasMore(true);
    initialScrollDoneRef.current = false;
    loadLatest();
  }, [conversationId]);

  // --- HÀM HELPER: Thêm tin nhắn vào danh sách (chống trùng lặp) ---
  const appendMessage = (msg) => {
    // Chỉ thêm nếu tin nhắn thuộc hội thoại này
    if (!msg || msg.conversation_id !== conversationId) return;

    setMessages((prev) => {
      // Kiểm tra xem tin nhắn đã tồn tại chưa (dựa vào ID)
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  };

  // 2. Lắng nghe tin nhắn MÌNH GỬI (newMessageProp)
  useEffect(() => {
    if (newMessageProp) {
      appendMessage(newMessageProp);
    }
  }, [newMessageProp, conversationId]);

  // 3. Lắng nghe tin nhắn NGƯỜI KHÁC GỬI (incomingMessageProp)
  useEffect(() => {
    if (incomingMessageProp) {
      appendMessage(incomingMessageProp);
    }
  }, [incomingMessageProp, conversationId]);

  // --- CÁC HÀM API LOAD DỮ LIỆU ---
  const loadLatest = async () => {
    try {
      const res = await api.get(`/messages`, {
        params: { conversation_id: conversationId, limit: LIMIT },
      });
      const list = Array.isArray(res.data) ? res.data : res.data.data || [];
      setMessages(list.reverse());
      setHasMore(list.length === LIMIT);
    } catch (err) {
      console.error("Load latest fail:", err);
    }
  };

  const loadMore = async () => {
    if (!hasMore || messages.length === 0 || loadingMore) return;
    setLoadingMore(true);

    const container = containerRef.current;
    const prevScrollHeight = container.scrollHeight;
    const oldest = messages[0];

    try {
      await sleep(500); // Giả lập delay nhẹ để không giật
      const res = await api.get(`/messages`, {
        params: {
          conversation_id: conversationId,
          limit: LIMIT,
          before: oldest.created_at || oldest.createdAt,
        },
      });
      const list = Array.isArray(res.data) ? res.data : res.data.data || [];

      if (list.length < LIMIT) setHasMore(false);

      setMessages((prev) => [...list.reverse(), ...prev]);

      // Giữ vị trí thanh cuộn sau khi load thêm
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - prevScrollHeight;
        }
      }, 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) loadMore();
  };

  // --- TỰ ĐỘNG CUỘN XUỐNG DƯỚI ---
  useLayoutEffect(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

      // Xác định xem tin nhắn cuối cùng có phải là tin mới không (của mình hoặc của người khác)
      const lastMsg = messages[messages.length - 1];
      const isNewSentMessage =
        newMessageProp && lastMsg?.id === newMessageProp.id;
      const isNewIncomingMessage =
        incomingMessageProp && lastMsg?.id === incomingMessageProp.id;

      if (
        !initialScrollDoneRef.current || // Lần đầu vào
        isNearBottom || // Đang ở gần đáy
        isNewSentMessage || // Mình vừa gửi
        isNewIncomingMessage // Người khác vừa gửi
      ) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        initialScrollDoneRef.current = true;
      }
    }
  }, [messages, newMessageProp, incomingMessageProp]); // Thêm incomingMessageProp vào dependency

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 scroll-smooth"
    >
      {loadingMore && (
        <div className="text-center text-xs text-gray-400 mb-2">Loading...</div>
      )}

      {messages.length === 0 && !loadingMore && (
        <div className="text-center text-sm text-gray-400 mt-10">
          Chưa có tin nhắn
        </div>
      )}

      {messages.map((m) => (
        <MessageItem key={m.id} message={m} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
