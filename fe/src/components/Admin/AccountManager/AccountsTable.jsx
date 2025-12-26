export default function AccountsTable({
  accounts,
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
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Túi xu</th>
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
              <td className="flex gap-2">
                <button onClick={() => onView(a.id)}>Chi tiết</button>
                <button onClick={() => onEdit(a.id)}>Sửa</button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(a.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {accounts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-4">
                Không tìm thấy tài khoản
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
