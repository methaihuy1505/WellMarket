import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useUser } from "../../contexts/UserContext";
import { uploadToCloudinary } from "../../utils/UploadToCloudinary";

// Import các tab con
import TabProfile from "./TabProfile";
import TabFavoritedBy from "./TabFavoritedBy";
import TabFavoriteUsers from "./TabFavoriteUsers";
import TabFavoritePosts from "./TabFavoritePosts";
import TabPayments from "./TabPayments";
import TabReviews from "./TabReviews";
import TabSettings from "./TabSetting";

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "profile";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const token =
    localStorage.getItem("userToken") ?? localStorage.getItem("adminToken");

  // Redirect nếu chưa login
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // Load data theo tab
  useEffect(() => {
    // Tab profile dùng data từ context user, settings ko cần load list
    if (!token || tab === "settings" || tab === "profile") {
      setData(null);
      return;
    }

    const map = {
      "favorited-by": "/profile/favorited-by",
      "favorite-users": "/profile/favorite-users",
      "favorite-posts": "/profile/favorite-posts",
      payments: "/profile/payments",
      reviews: "/profile/reviews",
    };

    const endpoint = map[tab];
    if (!endpoint) return;

    setLoading(true);
    api
      .get(endpoint)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [tab, token]);

  // Xử lý upload avatar
  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Chỉ hỗ trợ file ảnh (JPEG, PNG, WEBP).");
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const fileId = await uploadToCloudinary(file, "image");
      const res = await api.post("/profile/upload-avatar", { file_id: fileId });

      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar_url,
        avatar_key: res.data.avatar_key,
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Lỗi khi tải ảnh lên!");
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  const menuItems = [
    { key: "profile", label: "Tổng quan", icon: "👤" },
    { key: "favorited-by", label: "Người thích tôi", icon: "❤️" },
    { key: "favorite-users", label: "Tôi đã thích", icon: "😍" },
    { key: "favorite-posts", label: "Bài đăng đã thích", icon: "🔖" },
    { key: "payments", label: "Lịch sử giao dịch", icon: "💳" },
    { key: "reviews", label: "Đánh giá của tôi", icon: "⭐" },
    { key: "settings", label: "Cài đặt tài khoản", icon: "⚙️" },
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-140px)] py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* === SIDEBAR (MENU TRÁI) === */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center border border-gray-100 sticky top-24">
            {/* Avatar Circle */}
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-50 shadow-md">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 text-white flex items-center justify-center text-3xl font-bold">
                    {user.avatarText || user.name?.charAt(0)}
                  </div>
                )}
              </div>
              {/* Overlay Edit */}
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white font-medium text-xs backdrop-blur-sm"
              >
                {isUploadingAvatar ? "Đang tải..." : "Đổi ảnh"}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={isUploadingAvatar}
              />
            </div>

            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

            {/* Menu List */}
            <div className="w-full space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(`/profile?tab=${item.key}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    tab === item.key
                      ? "bg-pink-50 text-pink-600 shadow-sm ring-1 ring-pink-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT (NỘI DUNG PHẢI) === */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {tab === "profile" && <TabProfile data={user} />}
                {tab === "favorited-by" && <TabFavoritedBy data={data} />}
                {tab === "favorite-users" && <TabFavoriteUsers data={data} />}
                {tab === "favorite-posts" && <TabFavoritePosts data={data} />}
                {tab === "payments" && <TabPayments data={data} />}
                {tab === "reviews" && <TabReviews data={data} />}
                {tab === "settings" && <TabSettings />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
