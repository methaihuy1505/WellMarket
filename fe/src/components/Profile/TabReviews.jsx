export default function TabReviews({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">💬</div>
        <p className="text-gray-500">Bạn chưa có đánh giá nào.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Đánh giá từ tôi</h2>
      <div className="grid gap-4">
        {data.map((r) => (
          <div
            key={r.id}
            className="bg-white p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Header: Rating & Date */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= (r.rating || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs font-bold text-yellow-700 ml-1">
                  {r.rating ? `${r.rating}/5` : ""}
                </span>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {new Date(r.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "{r.content}"
            </p>

            {/* Footer: Thông tin đối tượng được đánh giá */}
            <div className="pt-3 border-t border-dashed border-gray-100 flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                {r.target_type === "user" ? "Người dùng" : "Bài đăng"}
              </span>
              <span>ID: #{r.target_id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
