// src/components/Admin/EventManager/EventTable.jsx
import React from "react";

// Helper format ngày gọn gàng (DD/MM/YYYY HH:mm)
const fmtDateShort = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isPast = (iso) => (iso ? new Date(iso) < new Date() : false);

export default function EventTable({ events, onView, onEdit, onDelete }) {
  if (!Array.isArray(events)) return null;

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="px-4 py-3 w-10">#</th>
            <th className="px-4 py-3">Thông tin sự kiện</th>
            <th className="px-4 py-3 text-center">Loại</th>
            <th className="px-4 py-3">Phần thưởng</th>
            <th className="px-4 py-3">Thời gian diễn ra</th>
            <th className="px-4 py-3 text-center">Trạng thái</th>
            <th className="px-4 py-3 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {events.map((ev) => {
            const ended = isPast(ev.end);
            return (
              <tr
                key={ev.id}
                className={`hover:bg-pink-50 transition-colors ${
                  ended ? "bg-gray-50 opacity-60" : ""
                }`}
              >
                <td className="px-4 py-3 text-gray-500 text-sm">{ev.id}</td>

                {/* Cột 1: Tên sự kiện + Tên game (Gộp lại cho gọn) */}
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span
                      className="font-medium text-gray-900 truncate max-w-[200px]"
                      title={ev.title}
                    >
                      {ev.title}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      🎮 {ev.gameType || "Chưa chọn game"}
                    </span>
                  </div>
                </td>

                {/* Cột 2: Loại (Badge màu) */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      ev.type === "monthly"
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {ev.type === "monthly" ? "Tháng" : "Ngày"}
                  </span>
                </td>

                {/* Cột 3: Xu */}
                <td className="px-4 py-3 font-medium text-pink-600">
                  {Number(ev.coins).toLocaleString()} xu
                </td>

                {/* Cột 4: Thời gian (Start - End) */}
                <td className="px-4 py-3 text-sm text-gray-600">
                  <div className="flex flex-col gap-1">
                    <span className="whitespace-nowrap">
                      🟢 {fmtDateShort(ev.start)}
                    </span>
                    <span className="whitespace-nowrap">
                      🔴 {fmtDateShort(ev.end)}
                    </span>
                  </div>
                </td>

                {/* Cột 5: Trạng thái (Active/Ended) */}
                <td className="px-4 py-3 text-center">
                  {ended ? (
                    <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
                      Kết thúc
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium animate-pulse">
                      Đang chạy
                    </span>
                  )}
                </td>

                {/* Cột 6: Actions */}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      title="Xem chi tiết"
                      onClick={() => onView(ev.id)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>

                    {!ended && (
                      <button
                        title="Chỉnh sửa"
                        onClick={() => onEdit(ev.id)}
                        className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    )}

                    <button
                      title="Xóa"
                      onClick={() => onDelete(ev.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {events.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-gray-400 flex-col"
              >
                <p className="text-lg">Chưa có sự kiện nào</p>
                <p className="text-sm">Hãy bấm "Tạo sự kiện" để bắt đầu</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
