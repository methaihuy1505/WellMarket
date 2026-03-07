// BlockedPostsTable.jsx
import { fmtDate } from "../../../utils/utils";

export default function BlockedPostsTable({
  blocked,
  onView,
  onUnblock,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tên bài</th>
            <th>Lý do</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blocked.map((b) => (
            <tr key={b.id} className="border-b">
              <td>{b.id}</td>
              <td>{b.title ?? "-"}</td>
              <td>{b.blockReason ?? b.reason ?? "-"}</td>
              <td>{fmtDate(b.blockedAt ?? b.blocked_at)}</td>
              <td className="flex gap-2">
                <button onClick={() => onView(b.id)}>Chi tiết</button>
                <button onClick={() => onUnblock(b.id)}>
                  Hủy chặn
                </button>
              </td>
            </tr>
          ))}
          {blocked.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Không có bài bị chặn
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
