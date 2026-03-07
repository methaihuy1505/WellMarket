export default function TabProfile({ data }) {
  if (!data) return null;

  const StatCard = ({ label, value, colorClass }) => (
    <div
      className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center h-28 ${colorClass}`}
    >
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <span className="text-xs text-gray-600 uppercase tracking-wide mt-1 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
          Thông tin tổng quan
        </h2>
        <p className="text-gray-500 text-sm mt-1 pl-4">
          Thống kê hoạt động tài khoản của bạn
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          label="Số dư ví"
          value={`${Number(data.coins).toLocaleString()} WC`}
          colorClass="bg-yellow-50 border-yellow-200"
        />
        <StatCard
          label="Người thích tôi"
          value={data.favorites || 0}
          colorClass="bg-pink-50 border-pink-200"
        />
        <StatCard
          label="Tôi đã thích"
          value={data.favorite_users || 0}
          colorClass="bg-blue-50 border-blue-200"
        />
      </div>

      {/* Detail List */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <span className="text-gray-500">Họ và tên</span>
          <span className="font-semibold text-gray-800">{data.name}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <span className="text-gray-500">Email đăng nhập</span>
          <span className="font-semibold text-gray-800">{data.email}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <span className="text-gray-500">Số điện thoại</span>
          <span className="font-semibold text-gray-800">
            {data.phone || "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Ngày tham gia</span>
          <span className="font-semibold text-gray-800">
            {/* Dùng created_at nếu API có trả về, không thì ẩn */}
            {data.created_at
              ? new Date(data.created_at).toLocaleDateString("vi-VN")
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
