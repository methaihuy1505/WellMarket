// ReportsTable.jsx
export default function ReportsTable({
  reports,
  onView,
  onBlock,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tên bài</th>
            <th>Người báo</th>
            <th>Lý do</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-b">
              <td>{r.id}</td>
              <td>{r.postTitle ?? r.title ?? "-"}</td>
              <td>{r.reporterName ?? r.reporter ?? "-"}</td>
              <td>{r.reason ?? "-"}</td>
              <td className="flex gap-2">
                <button onClick={() => onView(r.postId ?? r.id)}>
                  Chi tiết
                </button>
                <button onClick={() => onBlock(r)}>Chặn</button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(r.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {reports.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Không có báo cáo
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
