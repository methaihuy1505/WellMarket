// src/components/post/PostReview.jsx
import { useState } from "react";
import api from "../../utils/api";
export default function PostReview({ postId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      await api.post("/reviews", {
        post_id: postId, // backend thường nhận field là post_id
        rating,
        comment,
      });
      alert("Đã gửi đánh giá");
      setComment(""); // reset sau khi gửi
      setRating(5);
    } catch (err) {
      console.error("Gửi đánh giá thất bại:", err);
      alert("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="font-semibold mb-2">Đánh giá sản phẩm</h2>

      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => setRating(i)}
            className={i <= rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded p-2 text-sm"
        placeholder="Nhận xét của bạn..."
      />

      <button
        onClick={submitReview}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Gửi đánh giá
      </button>
    </div>
  );
}
