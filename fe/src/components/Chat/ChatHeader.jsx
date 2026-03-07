// src/components/chat/ChatHeader.jsx
import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";

export default function ChatHeader({
  receiverId,
  postId,
  isOnline,
  onToggleSidebar,
}) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!receiverId) return;
    loadUser();
    loadPosts();
  }, [receiverId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get(`/users/${receiverId}`);
      setUser(res.data);
    } catch (err) {
      console.error("Không thể load user:", err);
    }
  };

  const loadPosts = async () => {
    try {
      const res = await api.get(`/users/${receiverId}/posts`);
      const list = Array.isArray(res.data) ? res.data : res.data.data;
      setPosts(list);
      const pre = postId ? list.find((p) => p.id === Number(postId)) : null;
      setSelectedPost(pre || list[0] || null);
    } catch (err) {
      console.error("Không thể load posts:", err);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white m-2">
        {user && (
          <div className="flex border-t-2 border-l-2 border-r-2 rounded-t-lg border-pink-100 items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold text-pink-700">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="font-semibold text-sm">{user.name}</div>
                <div className="text-xs text-green-500">
                  {isOnline ? "Đang hoạt động" : "Offline"}
                </div>
              </div>
            </div>
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ☰
            </button>
          </div>
        )}

        {selectedPost && (
          <div className="bg-gray-50 border-t relative" ref={dropdownRef}>
            <div
              tabIndex={0}
              onClick={() => setOpen((o) => !o)}
              className="group flex gap-3 cursor-pointer border-b-2 border-l-2 border-r-2 rounded-b-lg border-pink-100 p-2 bg-white"
            >
              <img
                src={selectedPost.image}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{selectedPost.title}</div>
                <div className="text-sm text-gray-600">
                  {selectedPost.price?.toLocaleString()} đ
                  <span className="text-gray-400">
                    {" "}
                    · {selectedPost.post_status}
                  </span>
                </div>
              </div>
              <div
                className={`text-xl pr-2 self-center text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180 text-pink-500" : ""
                }`}
              >
                ▾
              </div>
            </div>

            {open && (
              <div className="absolute left-1 right-1 top-full bg-white border rounded shadow max-h-64 overflow-y-auto z-50">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPost(p);
                      setOpen(false);
                    }}
                    className={`flex gap-3 p-2 cursor-pointer hover:bg-gray-100 ${
                      p.id === selectedPost.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <img
                      src={p.image}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-sm text-gray-600">
                        {p.price?.toLocaleString()} đ
                        <span className="text-gray-400">
                          {" "}
                          · {p.post_status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="p-3 text-sm text-gray-400">
                    Không có bài đăng
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
