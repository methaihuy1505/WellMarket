export default function ReportsTable({ reports, onView }) {
    return (
        <div className="overflow-x-auto">

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b text-sm text-gray-600">
                        <th className="py-2 w-16">#</th>
                        <th className="py-2">Tên tài khoản</th>
                        <th className="py-2">Lý do</th>
                        <th className="py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r) => (
                        <tr key={r.id} className="border-b">
                            <td className="py-2">{r.id}</td>
                            <td className="py-2">{r.name}</td>
                            <td className="py-2">{r.reason}</td>
                            <td className="py-2">
                                <button
                                    className="px-3 py-1 border rounded text-sm"
                                    onClick={() => onView(r.id)}
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}

                    {reports.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-4 text-center text-gray-500"
                            >
                                Không có báo cáo
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
