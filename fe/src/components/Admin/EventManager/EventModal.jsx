// src/components/Admin/EventManager/EventModal.jsx
import React from "react";

export default function EventModal({
  open,
  mode,
  loading,
  event,
  endTime,
  gameTypes,
  onClose,
  onChange,
  onSave,
  setEndTime,
  saving
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === "view"
              ? "Chi tiết sự kiện"
              : mode === "edit"
                ? "Sửa sự kiện"
                : "Tạo sự kiện"}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : mode === "view" ? (
          <div className="space-y-3">
            <p><b>Tên:</b> {event?.title}</p>
            <p><b>Loại:</b> {event?.type}</p>
            <p><b>Xu:</b> {event?.coins}</p>
            <p><b>Trò chơi:</b> {event?.gameType}</p>

            <div className="flex justify-end mt-4">
              <button className="px-3 py-2 border rounded" onClick={onClose}>
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Tên sự kiện */}
            <div>
              <label className="text-sm">Tên</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={event?.title ?? ""}
                onChange={(e) => onChange("title", e.target.value)}
              />
            </div>

            {/* Loại */}
            <div>
              <label className="text-sm">Loại</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={event?.type ?? "day"}
                onChange={(e) => onChange("type", e.target.value)}
              >
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
              </select>
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Thời gian bắt đầu</label>
                <input
                  type="datetime-local"
                  className="w-full border px-3 py-2 rounded"
                  value={
                    event?.start
                      ? new Date(event.start).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    onChange("start", v ? new Date(v).toISOString() : "");
                  }}
                />
              </div>

              <div>
                <label className="text-sm">Thời gian kết thúc (giờ:phút)</label>
                <input
                  type="time"
                  className="w-full border px-3 py-2 rounded"
                  value={endTime ?? ""}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Xu thưởng */}
            <div>
              <label className="text-sm">Số xu thưởng</label>
              <input
                type="number"
                min={0}
                className="w-full border px-3 py-2 rounded"
                value={Number(event?.coins ?? 0)}
                onChange={(e) => onChange("coins", Number(e.target.value))}
              />
            </div>

            {/* Loại game */}
            <div>
              <label className="text-sm">Loại trò chơi</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={event?.gameType ?? gameTypes[0]}
                onChange={(e) => onChange("gameType", e.target.value)}
              >
                {gameTypes.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Action */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-3 py-2 border rounded"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className="px-3 py-2 bg-green-600 text-white rounded"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}
