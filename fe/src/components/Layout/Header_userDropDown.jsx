import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // ============================
  //  API DATA
  // ============================
  const [user, setUser] = useState({
    name: "",
    avatarText: "",
    follower: 0,
    following: 0,
    coins: 0,
  });

//   useEffect(() => {
//     // Giả lập API (bạn thay URL thật ở đây)
//     fetch("http://localhost:8000/api/user-info")
//       .then((res) => res.json())
//       .then((data) => {
//         setUser({
//           name: data.name,
//           avatarText: data.name?.[0]?.toLowerCase() || "u",
//           follower: data.follower,
//           following: data.following,
//           coins: data.coins,
//         });
//       })
//       .catch((err) => console.error("API Error:", err));
//   }, []);


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
        <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          {user.avatarText}
        </div>
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
              <div className="bg-pink-500 w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white font-bold">
                {user.avatarText}
              </div>
              <span className="absolute bottom-0 right-0 bg-black text-white text-xs rounded-full px-1">
                ✎
              </span>
            </div>

            <p className="mt-2 text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">
              Người theo dõi {user.follower} · Đang theo dõi {user.following}
            </p>
          </div>

        

          <SectionTitle text="Tiện ích" />
          <MenuItem label="Tin đăng đã lưu" icon="" />
          <MenuItem label="Tìm kiếm đã lưu" icon="" />
          <MenuItem label="Lịch sử xem tin" icon="" />
          <MenuItem label="Đánh giá từ tôi" icon="" />

          <SectionTitle text="Dịch vụ trả phí" />
          <MenuItem label="Kênh Đối Tác" icon="" />
          <MenuItem label="Lịch sử giao dịch" icon="" />

          <div className="flex justify-between items-center border-b py-3">
            <MenuItem label="Cửa hàng / chuyên trang" icon="" noBorder />
            <button className="text-xs font-semibold px-2 py-1 bg-gray-200 rounded-lg">
              Tạo ngay
            </button>
          </div>

          <SectionTitle text="Ưu đãi, khuyến mãi" />
          <MenuItem label="Ưu đãi của tôi" icon="" />

          <SectionTitle text="Khác" />
          <MenuItem label="Cài đặt tài khoản" icon="" />
          <MenuItem label="Trợ giúp" icon="" />
          <MenuItem label="Đóng góp ý kiến" icon="" />

          {/* Logout */}
          <div
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => alert('Đăng xuất')}
          >
            <div className="flex items-center space-x-3 text-red-500">
              <span className="text-lg"></span>
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

function MenuItem({ label, icon, noBorder }) {
  return (
    <div
      className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 rounded-lg ${
        noBorder ? "" : "border-b"
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span>›</span>
    </div>
  );
}
