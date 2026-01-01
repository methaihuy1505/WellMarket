// src/pages/ChatPage.jsx
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import Header from "../Layout/Header";
import { useState } from "react";

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState(null);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <Header />

      {/* CONTENT = phần còn lại */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT */}
        <div className="w-80  bg-gray-100 overflow-y-auto">
          <ChatList
            onSelect={setActiveConversation}
            activeId={activeConversation?.id}
          />
        </div>

        {/* CENTER */}
        <div className="flex-1 overflow-hidden">
          {activeConversation ? (
            <ChatWindow conversation={activeConversation} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Chọn một cuộc trò chuyện
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
