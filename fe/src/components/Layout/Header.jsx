import { useNavigate } from "react-router-dom";
import { LoginModal } from "../Modal/LoginModal";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar"; // Import SearchBar

import heartIcon from "../../assets/heart.png";
import messageIcon from "../../assets/message.png";
import notiIcon from "../../assets/notificaion.png";

// Thêm props showSearch và onSearch
export default function Header({ showSearch = false, onSearch }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const isLoggedIn = !!(adminToken || userToken);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-50 h-[70px]">
      {/* LEFT - Logo */}
      <div className="flex items-center shrink-0 w-[200px]">
        <span
          onClick={() => navigate("/")}
          className="text-2xl font-medium font-italic cursor-pointer text-pink-600"
        >
          WellMarket
        </span>
      </div>

      {/* CENTER - SearchBar (Chỉ hiện khi cuộn xuống) */}
      <div
        className={`flex-grow max-w-xl mx-4 transition-all duration-300 ease-in-out ${
          showSearch
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <SearchBar
          onSearch={onSearch}
          className="bg-gray-100 border border-transparent focus-within:bg-white focus-within:border-pink-300" // Style riêng cho header
        />
      </div>

      {/* RIGHT - Icons & Actions */}
      <div className="flex items-center space-x-3 shrink-0 w-[350px] justify-end">
        <button
          onClick={() => navigate("/profile?tab=favorite-posts")}
          className="text-3xl text-gray-600 border-gray-300 hover:shadow-md rounded-full w-10 h-10 flex items-center justify-center transition-all"
        >
          <img src={heartIcon} alt="Heart" className="w-6 h-6 object-contain" />
        </button>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              LoginModal.show();
              return;
            }
            navigate("/chat");
          }}
          className="text-xl text-gray-600 border-gray-300 hover:shadow-md rounded-full w-10 h-10 flex items-center justify-center transition-all"
        >
          <img
            src={messageIcon}
            alt="Message"
            className="w-6 h-6 object-contain"
          />
        </button>

        <button className="text-md text-gray-600 border-gray-300 hover:shadow-md rounded-full w-10 h-10 flex items-center justify-center transition-all">
          <img
            src={notiIcon}
            alt="Notification"
            className="w-6 h-6 object-contain"
          />
        </button>

        {!isLoggedIn && (
          <button
            onClick={() => LoginModal.show()}
            className="text-md border px-4 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors whitespace-nowrap"
          >
            Đăng nhập
          </button>
        )}

        <button
          onClick={() => navigate("/up-post")}
          className="text-md bg-pink-500 text-white px-5 py-1.5 rounded-full font-medium hover:bg-pink-600 transition-colors shadow-sm whitespace-nowrap"
        >
          Đăng tin
        </button>

        {isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
}
