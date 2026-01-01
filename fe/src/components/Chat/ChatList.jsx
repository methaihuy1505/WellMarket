// src/components/chat/ChatList.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axios";
import { conversationsMock } from "./Mock/conversations.mock";

export default function ChatList({ onSelect, activeId }) {
  const [Searchopen, setSearchOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread | online

  useEffect(() => {
    setConversations(conversationsMock);
    // axios.get("/conversations").then(res => {
    //   const list = Array.isArray(res.data)
    //     ? res.data
    //     : res.data.data;
    //   setConversations(list || []);
    // });
  }, []);

  const filteredList = useMemo(() => {
    return conversations.filter(c => {
      if (filter === "unread" && !c.unread) return false;
      if (filter === "online" && !c.online) return false;

      if (!keyword) return true;

      return (
        c.name.toLowerCase().includes(keyword.toLowerCase()) ||
        (c.lastMessage || "")
          .toLowerCase()
          .includes(keyword.toLowerCase())
      );
    });
  }, [conversations, keyword, filter]);

  return (
    <div className="h-full flex flex-col bg-white ">
      <div className=" mx-auto my-auto">
        <p className="text-xl font-medium font-italic mx-auto my-auto">Chat</p>
      </div>
      {/* SEARCH */}
      <div className="p-2 border-b rounded-xs mv">
        {/* <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Tìm kiếm hội thoại"
          className="w-full border rounded px-3 py-2 text-sm rounded-xs"
        /> */}
        <div
          className={`flex items-center bg-gray-100 rounded-full pl-3 h-10
        ${Searchopen ? "ring-2 ring-pink-100 shadow-lg shadow-pink-100" : ""}`}
        >
          <img src="./src\assets\search.png" alt="" className="w-6 h-5" />
          <input
            type="text"
            placeholder="Tìm hội thoại"
            onChange={e => setKeyword(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            className="bg-transparent w-full text-md outline-none px-2  "
          />
        </div>
      </div>

      {/* FILTER */}
      <div className="flex text-sm border-b">
        {[
          { key: "all", label: "Tất cả" },
          { key: "unread", label: "Chưa đọc" },
          { key: "online", label: "Đang online" }
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 py-2 transition-all duration-200 ${filter === f.key
                ? "border-b-2 border-pink-500 font-medium text-black"
                : "text-gray-400 hover:text-black"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">
        {filteredList.length === 0 && (
          <div className="p-4 text-sm text-gray-400">
            Không có hội thoại
          </div>
        )}

        {filteredList.map(c => (
          <div
            key={c.id}
            onClick={() => onSelect(c)}
            className={`p-3 cursor-pointer hover:bg-gray-100 ${activeId === c.id ? "bg-gray-100" : ""
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{c.name}</div>
              {c.unread && (
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>

            <div className="text-sm text-gray-500 truncate">
              {c.lastMessage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
