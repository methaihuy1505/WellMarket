import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReportModal from "./PostReportModal";

export default function PostInfo({ post, userId }) {
  const [openReport, setOpenReport] = useState(false);
const navigate = useNavigate();

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
          Chia sẻ
        </button>

        <button
          onClick={() => setOpenReport(true)}
          className="text-sm px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50"
        >
          Báo cáo
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-xl font-semibold leading-snug pr-28">
        {post.title}
      </h1>

      {/* CATEGORY / CONDITION */}
      <div className="text-sm text-gray-500">
        {post.item_condition} · {post.category_name}
      </div>

      {/* PRICE */}
      <div className="text-red-500 text-2xl font-bold ">
        {typeof post.price === "number"
          ? post.price.toLocaleString() + " đ"
          : "Liên hệ"}
      </div>

      {/* LOCATION */}
      <div className="text-sm text-gray-600">
        <div>{post.location}</div>
        {post.city && <div className="text-gray-400">({post.city})</div>}
      </div>

      {/* UPDATED */}
      <div className="text-sm text-gray-500">
        Cập nhật {post.updated_ago || "vài phút trước"}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex-1 bg-gray-100 py-2 rounded text-sm font-medium hover:bg-gray-200">
          {post.phone ?? "Hiện số"}
        </button>

        <button className="flex-1 bg-pink-400 py-2 rounded font-semibold hover:bg-pink-200">
          Chat
        </button>
      </div>

      {/* SELLER CARD */}
      <div className="border rounded-lg p-3 flex justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
            {post.user_name?.charAt(0) || "U"}
          </div>

          <div>
            <div className="font-medium">
              {post.user_name || "Tên chưa cung cấp"}
            </div>
            <div className="text-xs text-gray-500">
              Hoạt động {post.last_active || "gần đây"} · Phản hồi{" "}
              {post.response_rate ?? "100%"}
            </div>
          </div>
        </div>

        <div className=" flex text-xs text-gray-500 text-right space-x-1">
          <div className="text-right text-xs text-gray-500 space-y-0.5">
            <button
              onClick={() => navigate(`/user/${post.user_id}/sold`)}
              className="
      block w-full text-right
      hover:underline
      hover:font-semibold
      transition
    "
            >
              {post.sold_count ?? 0} đã bán
            </button>

            <button
              onClick={() => navigate(`/user/${post.user_id}/reviews`)}
              className="
      block w-full text-right
      hover:underline
      hover:font-semibold
      transition
    "
            >
              {post.review_count ?? 0} đánh giá
            </button>
          </div>
        </div>
      </div>

      {/* QUICK MSG */}
      <div className="flex flex-wrap gap-2">
        {(post.quick_messages ?? [
          "Sản phẩm này còn không?",
          "Có ship không?",
          "Đã dùng bao lâu?"
        ]).map((msg, i) => (
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
        userId={userId}
        targetId={post.id}
        targetType="post"
      />
    </div>
  );
}
