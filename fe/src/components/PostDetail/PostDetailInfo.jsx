import { useNavigate } from "react-router-dom";
export default function PostDetailInfo({ post }) {
  if (!post) return null;
  const navigate = useNavigate();
  const formatWarranty = (value) => {
    if (!value || value === "no") return "Không bảo hành";

    const map = {
      "1m": "1 tháng",
      "3m": "3 tháng",
      "6m": "6 tháng",
      "12m": "12 tháng",
    };

    return map[value] || value;
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h2 className="font-semibold">Thông tin chi tiết</h2>

      <div className="text-sm divide-y">
        {/* TÌNH TRẠNG */}
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Tình trạng</span>
          <span>{post.item_condition || "Không rõ"}</span>
        </div>

        {/* LOẠI SP */}
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Loại sản phẩm</span>
          <span>{post.category_name || "-"}</span>
        </div>

        {/* BẢO HÀNH */}
        {post.warranty && (
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Bảo hành</span>
            <span>{formatWarranty(post.warranty)}</span>
          </div>
        )}

        {/* ATTRIBUTES */}
        {Array.isArray(post.attributes) &&
          post.attributes.map((attr, i) => (
            <div key={i} className="flex justify-between py-2">
              <span className="text-gray-500">{attr.split(":")[0]}</span>
              <span>{attr.split(":").slice(1).join(":").trim()}</span>
            </div>
          ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between bg-gray-50 rounded p-3 text-sm">
        <span>Bạn có sản phẩm tương tự?</span>
        <button
          onClick={() => navigate("/up-post")}
          className="bg-black text-white px-4 py-1.5 rounded-full text-xs"
        >
          Đăng bán
        </button>
      </div>
    </div>
  );
}
