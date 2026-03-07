export default function TabPayments({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">💳</div>
        <p className="text-gray-500">Chưa có giao dịch nào phát sinh.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Lịch sử giao dịch
      </h2>
      <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Mã GD
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Nội dung
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((p) => {

              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                    #{p.id}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-bold 
                      text-red-600
                    `}
                  >
                    {Number(p.amount).toLocaleString()} đ
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {p.description || "Giao dịch hệ thống"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
