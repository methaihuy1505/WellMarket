// src/components/manage/ManageHeader.jsx
export default function ManageHeader({ userName, search, onSearch }) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* LEFT: USER NAME */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
          {userName?.charAt(0)}
        </div>

        <div>
          <div className="font-semibold">{userName}</div>
          <div className="text-sm text-blue-600 cursor-pointer">
            + Tạo cửa hàng
          </div>
        </div>
      </div>

      {/* RIGHT: SEARCH */}
      <div className="relative w-[320px]">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Tìm tin đăng của bạn..."
          className="w-full pl-10 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring"
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
    </div>
  );
}
