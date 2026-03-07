import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { LoginModal } from "../Modal/LoginModal";
// 1. Import hook useUser
import { useUser } from "../../contexts/UserContext";

export default function PostCard({ item, idx }) {
  const navigate = useNavigate();
  // 2. Lấy user từ Context (để lắng nghe thay đổi)
  const { user } = useUser();

  // State local
  const [liked, setLiked] = useState(false); // Khởi tạo false trước
  const [loading, setLoading] = useState(false);

  const isBoosted = !!item.is_boosted;

  // 3. Dùng useEffect để đồng bộ state khi:
  // - Item thay đổi (khi scroll hoặc filter)
  // - User thay đổi (khi đăng nhập / đăng xuất)
  useEffect(() => {
    // Nếu không có user (đã logout) -> Chắc chắn là không like (false)
    // Nếu có user -> Lấy giá trị từ dữ liệu bài viết
    if (!user || !user.id) {
      setLiked(false);
    } else {
      setLiked(!!item.is_favorited);
    }
  }, [user, item.is_favorited]);

  const toggleLike = async (e) => {
    e.stopPropagation();

    // Check user từ context thay vì localStorage thủ công
    if (!user?.id || loading) {
      LoginModal.show();
      return;
    }

    setLoading(true);
    setLiked((prev) => !prev); // optimistic update

    try {
      const res = await api.post("/interactions/favorite/toggle", {
        target_id: item.id,
        target_type: "post",
      });
      setLiked(res.data.favorited);
    } catch (err) {
      console.error(err);
      setLiked((prev) => !prev); // rollback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/posts/${item.id}`)}
      className={`group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border 
        ${
          isBoosted
            ? "border-yellow-400 ring-1 ring-yellow-400"
            : "border-gray-100"
        } 
      `}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
        {isBoosted && (
          <div className="absolute top-0 left-0 bg-yellow-400 text-red-700 text-[10px] font-bold px-2 py-1 z-20 rounded-br-lg shadow-sm">
            ĐẨY TIN 🔥
          </div>
        )}

        <img
          src={
            item.image_url ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black bg-opacity-50 px-2 py-0.5 rounded z-10 backdrop-blur-sm">
          {item.created_at
            ? new Date(item.created_at).toLocaleDateString("vi-VN")
            : "Vừa xong"}
        </span>

        {/* ❤️ Like button */}
        <button
          onClick={toggleLike}
          className={`absolute top-2 right-2 p-1.5 rounded-full z-10 shadow-sm transition-transform active:scale-90 ${
            liked
              ? "bg-red-50 text-red-500"
              : "bg-white/80 text-gray-400 hover:text-red-500"
          }`}
        >
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="p-3">
        <p
          className="text-[15px] font-medium line-clamp-2 text-gray-800 h-[46px]"
          title={item.title}
        >
          {item.title || "Không có tiêu đề"}
        </p>

        <p className="text-gray-500 text-xs mt-1 line-clamp-1">
          {item.model_name || item.category_name || "Sản phẩm khác"}
          {item.attributes?.length > 0 && " • " + item.attributes[0]}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-pink-600 font-bold text-lg">
            {item.price
              ? Number(item.price).toLocaleString("vi-VN") + " đ"
              : "Liên hệ"}
          </p>

          <span className="text-[10px] text-gray-400 truncate max-w-[80px]">
            {item.location || "Toàn quốc"}
          </span>
        </div>
      </div>
    </div>
  );
}
