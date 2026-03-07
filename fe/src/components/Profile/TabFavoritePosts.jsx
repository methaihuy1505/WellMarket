import { useNavigate } from "react-router-dom";

export default function TabFavoritePosts({ data }) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🔖</div>
        <p className="text-gray-500">Bạn chưa thích bài đăng nào.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors text-sm font-medium"
        >
          Khám phá ngay
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Bài đăng đã thích</h2>
      <div className="space-y-4">
        {data.map((item) => {
          // --- FIX LOGIC: Lấy từ 'target' thay vì 'post' ---
          const post = item.target || item.post;

          // Kiểm tra nếu bài viết bị xóa
          if (!post) return null;

          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-white group relative"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              {/* Badge trạng thái */}
              <div className="absolute top-4 right-4">
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    post.post_status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {post.post_status === "active"
                    ? "Đang bán"
                    : post.post_status}
                </span>
              </div>

              {/* Ảnh Thumbnail */}
              <div className="w-28 h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                {/* Giả sử Post có trả về primaryFile hoặc image_url */}
                {/* Nếu API trả về relation: post.post_medias */}
                <img
                  src={
                    post.image_url ||
                    "https://via.placeholder.com/150?text=No+Img"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thông tin */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 group-hover:text-pink-600 transition-colors pr-16">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>📍 {post.location || "Toàn quốc"}</span>
                    <span>•</span>
                    <span>👁️ {post.views_count || 0} lượt xem</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <p className="text-pink-600 font-bold text-xl">
                    {post.price
                      ? Number(post.price).toLocaleString() + " đ"
                      : "Liên hệ"}
                  </p>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    Đã lưu:{" "}
                    {new Date(item.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
