import { use, useState } from "react";
import ReportModal from "./PostReportModal";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../Modal/LoginModal";

export default function PostInfo({ post }) {
  const [openReport, setOpenReport] = useState(false);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const token = userToken ?? adminToken;
  if (!post) return null;

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert("Đã copy link bài đăng");
  };

  return (
    <div className="space-y-4 relative">
      {/* TOP RIGHT ACTIONS */}
      <div className="absolute right-0 top-0 flex gap-2">
        <button
          onClick={handleShare}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          🔗 Chia sẻ
        </button>

        <button
          onClick={() => setOpenReport(true)}
          className="text-sm px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50"
        >
          🚩 Báo cáo
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-xl font-semibold leading-snug pr-28">{post.title}</h1>

      {/* CATEGORY / CONDITION */}
      <div className="text-sm text-gray-500">
        {post.item_condition} · {post.category_name}
      </div>

      {/* PRICE */}
      <div className="text-red-500 text-2xl font-bold">
        {typeof post.price === "number"
          ? post.price.toLocaleString() + " đ"
          : "Giá trao đổi riêng"}
      </div>

      {/* LOCATION */}
      <div className="text-sm text-gray-600">
        <div>{post.location}</div>
      </div>

      {/* UPDATED */}
      <div className="text-sm text-gray-500">
        Cập nhật {post.updated_ago || "vài phút trước"}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex-1 bg-gray-100 py-2 rounded text-sm font-medium">
          {post.post_phone ?? "Hiện số"}
        </button>

        <button
          onClick={() => {
            if (!token) {
              LoginModal.show();
              return;
            }
            navigate(`/chat?receiver_id=${post.user_id}&post_id=${post.id}`);
          }}
          className="flex-1 bg-yellow-400 py-2 rounded font-semibold"
        >
          Chat
        </button>
      </div>

      {/* SELLER CARD */}
      <div className="border rounded-lg p-3 flex justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
            {post.user_name?.charAt(0) || "U"}
          </div>

          <div className="font-medium">
            {post.user_name || "Tên chưa cung cấp"}
          </div>
        </div>

        <div className="text-xs text-gray-500 text-right">
          <div>{post.sold_count ?? 0} đã bán</div>
          <div>⭐ {post.review_count ?? 0} đánh giá</div>
        </div>
      </div>

      {/* QUICK MSG */}
      <div className="flex flex-wrap gap-2">
        {(
          post.quick_messages ?? [
            "Sản phẩm này còn không?",
            "Có ship không?",
            "Đã dùng bao lâu?",
          ]
        ).map((msg, i) => (
          <button
            key={i}
            className="px-3 py-1.5 bg-gray-100 rounded-full text-xs"
          >
            {msg}
          </button>
        ))}
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        open={openReport}
        onClose={() => setOpenReport(false)}
        targetId={post.id}
        targetType="post"
      />
    </div>
  );
}
