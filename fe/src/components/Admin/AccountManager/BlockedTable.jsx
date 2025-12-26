export default function BlockedTable({ blocked, onView }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b text-sm text-gray-600">
                        <th className="py-2 w-16">#</th>
                        <th className="py-2">Tên</th>
                        <th className="py-2">Lý do</th>
                        <th className="py-2">Ngày chặn</th>
                        <th className="py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {blocked.map((b) => (
                        <tr key={b.id} className="border-b">
                            <td className="py-2">{b.id}</td>
                            <td className="py-2">{b.name}</td>
                            <td className="py-2">{b.reason}</td>
                            <td className="py-2">{b.blockedAt ?? "-"}</td>
                            <td className="py-2">
                                <button
                                    className="px-3 py-1 border rounded text-sm"
                                    onClick={() => onView(b.id)}
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}

                    {blocked.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="py-4 text-center text-gray-500"
                            >
                                Không có tài khoản bị chặn
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
