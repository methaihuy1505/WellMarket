// ChatWindow.jsx
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatSidebar from "./ChatSidebar";

export default function ChatWindow({ conversation }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-full flex bg-white">
      {/* CHAT MAIN */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          conversation={conversation}
          onToggleSidebar={() => setShowSidebar(s => !s)}
        />

        <MessageList conversationId={conversation.id} />
        <MessageInput conversationId={conversation.id} />
      </div>

      {/* SIDEBAR */}
      {showSidebar && (
        <ChatSidebar conversation={conversation} />
      )}
    </div>
  );
}
