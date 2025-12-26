// src/components/Admin/EventManager/EventTable.jsx
import React from "react";

const dateOnlyIso = (iso) =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "-";

const fmtDateTime = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
};

const isPast = (iso) => (iso ? new Date(iso) < new Date() : false);

export default function EventTable({ events, onView, onEdit, onDelete }) {
  if (!Array.isArray(events)) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th className="py-2 w-14">#</th>
            <th className="py-2">Tên</th>
            <th className="py-2">Ngày</th>
            <th className="py-2">Loại</th>
            <th className="py-2">Xu</th>
            <th className="py-2">Thời gian</th>
            <th className="py-2">Trò chơi</th>
            <th className="py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, idx) => {
            const ended = isPast(ev.end);
            return (
              <tr
                key={ev.id}
                className={`border-b hover:bg-gray-50 ${
                  ended ? "opacity-60" : ""
                }`}
              >
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{ev.title}</td>
                <td className="py-2">{dateOnlyIso(ev.start)}</td>
                <td className="py-2">
                  {ev.type === "month" ? "Tháng" : "Ngày"}
                </td>
                <td className="py-2">{ev.coins}</td>
                <td className="py-2">
                  {fmtDateTime(ev.start)} – {fmtDateTime(ev.end)}
                </td>
                <td className="py-2">{ev.gameType}</td>
                <td className="py-2 flex gap-2">
                  <button
                    className="px-3 py-1 border rounded text-sm"
                    onClick={() => onView(ev.id)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="px-3 py-1 border rounded text-sm"
                    disabled={ended}
                    onClick={() => !ended && onEdit(ev.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-3 py-1 border text-red-600 rounded text-sm"
                    onClick={() => onDelete(ev.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}

          {events.length === 0 && (
            <tr>
              <td colSpan={8} className="py-6 text-center text-gray-500">
                Không tìm thấy sự kiện
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
