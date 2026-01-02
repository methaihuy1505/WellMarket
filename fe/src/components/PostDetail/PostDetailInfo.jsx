export default function PostDetailInfo({ post }) {
  if (!post) return null;

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h2 className="font-semibold">Thông tin chi tiết</h2>

      <div className="text-sm divide-y">
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Tình trạng</span>
          <span>{post.item_condition || "Không rõ"}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Loại sản phẩm</span>
          <span>{post.category_name || "-"}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between bg-gray-50 rounded p-3 text-sm">
        <span>Bạn có sản phẩm tương tự?</span>
        <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs">
          Đăng bán
        </button>
      </div>
    </div>
  );
}
