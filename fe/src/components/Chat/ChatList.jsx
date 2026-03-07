// src/components/chat/ChatList.jsx
import { useMemo, useState } from "react";

export default function ChatList({ onSelect, activeId, conversations = [] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread

  function timeAgo(dateString) {
    if (!dateString) return "";
    const now = new Date();
    const created = new Date(dateString);
    const diff = (now - created) / 1000;

    if (diff < 60) return `${Math.floor(diff)} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return created.toLocaleDateString("en-US");
  }

  const filteredList = useMemo(() => {
    return conversations.filter((c) => {
      if (filter === "unread" && !c.unread) return false;
      if (!keyword) return true;

      const name = (c.receiver_name || "").toLowerCase();
      const message = (
        c.last_message?.content ||
        c.last_message ||
        ""
      ).toLowerCase();
      const kw = keyword.toLowerCase();

      return name.includes(kw) || message.includes(kw);
    });
  }, [conversations, keyword, filter]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="mx-auto my-auto">
        <p className="text-xl font-medium">Chats</p>
      </div>

      {/* Search box */}
      <div className="p-2 border-b">
        <div
          className={`flex items-center bg-gray-100 rounded-full pl-3 h-10 ${
            searchOpen ? "ring-2 ring-pink-100 shadow-lg shadow-pink-100" : ""
          }`}
        >
          <img src="./src/assets/search.png" alt="Search" className="w-6 h-5" />
          <input
            type="text"
            placeholder="Search conversations"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            className="bg-transparent w-full text-md outline-none px-2"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex text-sm border-b">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: "Unread" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 py-2 transition-all duration-200 ${
              filter === f.key
                ? "border-b-2 border-pink-500 font-medium text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filteredList.length === 0 && (
          <div className="p-4 text-sm text-gray-400">No conversations</div>
        )}

        {filteredList.map((c) => (
          <div
            key={c.id ?? `r-${c.receiver_id}`}
            onClick={() => onSelect(c)}
            className={`p-3 cursor-pointer hover:bg-gray-100 ${
              activeId === c.id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium flex items-center gap-2">
                {c.receiver_name || "User"}
              </div>
              {c.unread && (
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {c.last_message?.content || c.last_message || "No messages yet"}
            </div>
            <div className="text-xs text-gray-400">
              {timeAgo(c.last_message?.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
