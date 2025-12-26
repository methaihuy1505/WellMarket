// PostsTable.jsx
import { fmtDate } from "../../../utils/utils";

export default function PostsTable({
  posts,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tên bài</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Ngày đăng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.category ?? "-"}</td>
              <td>{p.price ?? "-"}</td>
              <td>{fmtDate(p.createdAt ?? p.date ?? p.created)}</td>
              <td className="flex gap-2">
                <button onClick={() => onView(p.id)}>Chi tiết</button>
                <button onClick={() => onEdit(p.id)}>Sửa</button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(p.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                Không tìm thấy bài đăng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
