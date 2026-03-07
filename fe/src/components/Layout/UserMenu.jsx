import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { initialUser } from "../../contexts/UserContext";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

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
          <div className="bg-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center font-semibold">
            {user.avatarText}
          </div>
        )}
        <span className="text-xs">▼</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          // --- ĐÃ SỬA Ở ĐÂY ---
          // Thêm max-h-[80vh] và overflow-y-auto
          className="absolute right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-lg p-4 z-50 animate-slideDown"
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
                <div className="bg-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center font-semibold">
                  {user.avatarText}
                </div>
              )}
              <button
                onClick={() => navigate("/profile?tab=profile")}
                className="absolute bottom-0 right-0 bg-black text-white text-xs rounded-full px-1 cursor-pointer"
              >
                ✎
              </button>
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
            onClick={() => navigate("/profile?tab=favorite-users")}
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
          <p className="text-sm text-gray-500 mt-2 px-1">
            Số dư WellCoin:{" "}
            <span className="font-bold text-pink-600">{user.coins} WC</span>
          </p>

          <SectionTitle text="Khác" />
          <MenuItem
            label="Cài đặt tài khoản"
            onClick={() => navigate("/profile?tab=settings")}
          />
          <MenuItem label="Trợ giúp" />
          <MenuItem label="Đóng góp ý kiến" />

          {/* Logout */}
          <div
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 rounded-lg border-t mt-2"
            onClick={() => {
              setUser(initialUser);
              localStorage.removeItem("userToken");
              localStorage.removeItem("adminToken");
              navigate("/");
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
  return (
    <p className="text-gray-500 text-sm mt-4 mb-2 font-semibold uppercase ">
      {text}
    </p>
  );
}

function MenuItem({ label, icon, noBorder, onClick }) {
  return (
    <div
      className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors ${
        noBorder ? "" : "border-b border-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-gray-400 text-xs">›</span>
    </div>
  );
}
