export default function AccountsTable({
  accounts,
  onView,
  onEdit,
  onToggleStatus,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Túi xu</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.id} className="border-b hover:bg-gray-50">
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.role}</td>
              <td>{a.coins}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    a.status === "banned"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {a.status === "banned" ? "Đã khóa" : "Hoạt động"}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() => onView(a.id)}
                  className="text-gray-600 hover:text-black"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => onEdit(a.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sửa
                </button>
                {a.status === "banned" ? (
                  <button
                    className="text-green-600 font-medium hover:text-green-800"
                    onClick={() => onToggleStatus(a)}
                  >
                    Bỏ chặn
                  </button>
                ) : (
                  <button
                    className="text-red-600 font-medium hover:text-red-800"
                    onClick={() => onToggleStatus(a)}
                  >
                    Khóa
                  </button>
                )}
              </td>
            </tr>
          ))}
          {accounts.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                Không tìm thấy tài khoản
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
