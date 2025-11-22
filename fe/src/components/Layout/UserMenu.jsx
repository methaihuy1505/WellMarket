import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    avatar: null,
    avatarText: "U",
    favorites: 0, // số người yêu thích mình
    favorite_users: 0, // số user mình đã yêu thích
    coins: 0,
  });

  // Khi menu mở thì gọi API lấy profile
  useEffect(() => {
    if (open) {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      axios
        .get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUser({
            name: data.name,
            avatar: data.avatar || null,
            avatarText: data.name?.[0]?.toUpperCase() || "U",
            favorites: data.favorites || 0,
            favorite_users: data.favorite_users || 0,
            coins: data.coins || 0,
          });
        })
        .catch((err) => {
          console.error("API Error:", err);
        });
    }
  }, [open]); // chỉ gọi khi open = true

  // Click outside -> close
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 border px-3 py-1 rounded-full hover:bg-gray-100"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
            {user.avatarText}
          </div>
        )}
        <span className="text-xs">▼</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg p-4 
            z-50 animate-slideDown
          "
        >
          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                  {user.avatarText}
                </div>
              )}
              <span className="absolute bottom-0 right-0 bg-black text-white text-xs rounded-full px-1">
                ✎
              </span>
            </div>

            <p className="mt-2 text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">
              Người yêu thích tôi: {user.favorites} · Tôi đã yêu thích:{" "}
              {user.favorite_users}
            </p>
          </div>

          <SectionTitle text="Tiện ích" />
          <MenuItem
            label="Người yêu thích tôi"
            onClick={() => navigate("/profile?tab=favorited-by")}
          />
          <MenuItem
            label="Người đã yêu thích"
            onClick={() => navigate("/profile?tab=favorited-users")}
          />
          <MenuItem
            label="Bài đăng yêu thích"
            onClick={() => navigate("/profile?tab=favorite-posts")}
          />
          <MenuItem
            label="Lịch sử giao dịch"
            onClick={() => navigate("/profile?tab=payments")}
          />
          <MenuItem
            label="Đánh giá từ tôi"
            onClick={() => navigate("/profile?tab=reviews")}
          />
          <p className="text-sm text-gray-500">
            Số dư WellCoin: {user.coins} WC
          </p>
          <SectionTitle text="Khác" />
          <MenuItem label="Cài đặt tài khoản" onClick={() => navigate("/profile?tab=settings")} />
          <MenuItem label="Trợ giúp" icon="" />
          <MenuItem label="Đóng góp ý kiến" icon="" />

          {/* Logout */}
          <div
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.setItem("isLoggedIn", "false");
              window.location.reload(); // reload để Header cập nhật
            }}
          >
            <div className="flex items-center space-x-3 text-red-500">
              <span className="font-medium">Đăng xuất</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------- CHILD COMPONENTS --------------------------- */
function SectionTitle({ text }) {
  return <p className="text-gray-500 text-sm mt-4 mb-2">{text}</p>;
}

function MenuItem({ label, icon, noBorder, onClick }) {
  return (
    <div
      className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 rounded-lg ${
        noBorder ? "" : "border-b"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span>›</span>
    </div>
  );
}
