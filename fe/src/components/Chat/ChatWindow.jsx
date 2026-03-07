// src/components/chat/ChatWindow.jsx
import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatSidebar from "./ChatSidebar";
import { echo } from "../../echo";
import { useUser } from "../../contexts/UserContext";

export default function ChatWindow({ conversation, postId, onMessageSent, incomingMessage }) {
  const { user } = useUser();
  const authId = user?.id;
  const receiverId =
    conversation?.user_one_id === authId
      ? conversation?.user_two_id
      : conversation?.user_one_id;

  const conversationId = conversation?.id;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // State để truyền tin nhắn vừa gửi xuống MessageList ngay lập tức
  const [lastSentMessage, setLastSentMessage] = useState(null);
    
  useEffect(() => {
    if (!receiverId && !conversationId) return;

    // Presence: join để lấy isOnline
    if (conversationId && receiverId) {
      const presenceName = `presence-conversation.${conversationId}`;
      const presence = echo.join(presenceName);

      presence.here((users) => {
        setIsOnline(users.some((u) => u.id === receiverId));
      });

      presence.joining((user) => {
        if (user.id === receiverId) setIsOnline(true);
      });

      presence.leaving((user) => {
        if (user.id === receiverId) setIsOnline(false);
      });

      return () => {
        echo.leave(presenceName);
      };
    }
  }, [receiverId, conversationId]);

  // Handler khi gửi tin nhắn thành công từ Input
  const handleSendSuccess = (msg) => {
    // 1. Đẩy xuống MessageList để hiện ngay
    setLastSentMessage(msg);
    // 2. Bắn ngược lên ChatPage để update sidebar
    if (onMessageSent) onMessageSent(msg);
  };

  if (!receiverId) return <div>Không có người nhận để chat</div>;

  return (
    <div className="h-full flex bg-white">
      <div className="flex-1 flex flex-col relative">
        <ChatHeader
          receiverId={receiverId}
          postId={postId}
          isOnline={isOnline}
          onToggleSidebar={() => setShowSidebar((s) => !s)}
        />

        {/* Truyền lastSentMessage vào để MessageList tự append */}
        <MessageList
          conversationId={conversationId}
          currentUserId={authId}
          newMessageProp={lastSentMessage}
          incomingMessageProp={incomingMessage}
        />

        <MessageInput
          receiverId={receiverId}
          conversationId={conversationId}
          onSend={handleSendSuccess}
        />
      </div>
      {showSidebar && (
        <ChatSidebar receiverId={receiverId} conversationId={conversationId} />
      )}
    </div>
  );
}
