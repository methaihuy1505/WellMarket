import { fmtDate } from "../../../utils/utils";

export default function PostsTable({
  posts,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Trạng thái</th>
            <th>Giá</th>
            <th>Người đăng</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td>{p.id}</td>
              <td className="max-w-xs truncate" title={p.title}>
                {p.title}
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : p.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : p.status === "sold"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="text-pink-600 font-medium">
                {Number(p.price).toLocaleString()} đ
              </td>
              <td>{p.author}</td>
              <td>{fmtDate(p.created_at)}</td>
              <td className="flex gap-2 items-center">
                <button
                  onClick={() => onView(p.id)}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => onEdit(p.id)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Sửa
                </button>
                {p.status === "active" ? (
                  <button
                    onClick={() => onToggleStatus(p.id)}
                    className="text-sm text-red-600 border border-red-200 px-2 py-0.5 rounded hover:bg-red-50"
                  >
                    Từ chối
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleStatus(p.id)}
                    className="text-sm text-green-600 border border-green-200 px-2 py-0.5 rounded hover:bg-green-50"
                  >
                    Duyệt lại
                  </button>
                )}
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-gray-400 hover:text-red-600 ml-1"
                  title="Xóa bài"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">
                Không có bài đăng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
