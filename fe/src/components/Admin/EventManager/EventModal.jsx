import React from "react";

export default function EventModal({
  open,
  mode,
  loading,
  event,
  endTime,
  gameTypes, // Array of {id, name}
  onClose,
  onChange,
  onSave,
  setEndTime,
  saving,
}) {
  if (!open) return null;

  // Helper tìm tên game để hiển thị ở chế độ view
  const getGameName = (id) => {
    const g = gameTypes.find((t) => t.id === Number(id));
    return g ? g.name : event?.gameType || "-";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg">
        <div className="flex justify-between mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">
            {mode === "view"
              ? "Chi tiết sự kiện"
              : mode === "edit"
              ? "Sửa sự kiện"
              : "Tạo sự kiện"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : mode === "view" ? (
          /* ================= VIEW MODE ================= */
          <div className="space-y-3">
            <p>
              <b>Tên sự kiện:</b> {event?.title}
            </p>
            <p>
              <b>Loại:</b> {event?.type === "month" ? "Tháng" : "Ngày"}
            </p>
            <p>
              <b>Phần thưởng:</b>{" "}
              <span className="text-pink-600 font-bold">
                {Number(event?.coins).toLocaleString()} xu
              </span>
            </p>
            <p>
              <b>Trò chơi:</b> {event?.gameType}
            </p>
            <p>
              <b>Bắt đầu:</b> {new Date(event?.start).toLocaleString()}
            </p>
            <p>
              <b>Kết thúc:</b> {new Date(event?.end).toLocaleString()}
            </p>
            <div className="bg-gray-50 p-3 rounded mt-2 text-sm">
              <b>Mô tả:</b> <br />
              {event?.description || "Không có mô tả"}
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={onClose}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          /* ================= EDIT / CREATE MODE ================= */
          <div className="space-y-4">
            {/* Tên sự kiện */}
            <div>
              <label className="text-sm font-medium">Tên sự kiện</label>
              <input
                className="w-full border px-3 py-2 rounded focus:outline-pink-500"
                value={event?.title ?? ""}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="Ví dụ: Đua top tháng 11"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Loại sự kiện */}
              <div>
                <label className="text-sm font-medium">Loại</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={event?.type ?? "daily"} // Mặc định là daily
                  onChange={(e) => onChange("type", e.target.value)}
                >
                  {/* SỬA value TƯƠNG TỰ */}
                  <option value="daily">Sự kiện Ngày</option>
                  <option value="monthly">Sự kiện Tháng</option>
                </select>
              </div>

              {/* Loại game (Dynamic from DB) */}
              <div>
                <label className="text-sm font-medium">Loại trò chơi</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={event?.minigame_type_id ?? ""}
                  onChange={(e) => onChange("minigame_type_id", e.target.value)}
                >
                  <option value="" disabled>
                    Chọn trò chơi
                  </option>
                  {gameTypes.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Xu thưởng */}
              <div>
                <label className="text-sm font-medium">Số xu thưởng</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border px-3 py-2 rounded"
                  value={event?.coins ?? 0}
                  onChange={(e) => onChange("coins", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Ngày bắt đầu */}
              <div>
                <label className="text-sm font-medium">
                  Bắt đầu (Ngày & Giờ)
                </label>
                <input
                  type="datetime-local"
                  className="w-full border px-3 py-2 rounded"
                  value={event?.start ?? ""}
                  onChange={(e) => onChange("start", e.target.value)}
                />
              </div>

              {/* Giờ kết thúc (Logic: Cùng ngày start, chỉ chọn giờ) */}
              <div>
                <label className="text-sm font-medium">
                  Giờ kết thúc (trong ngày)
                </label>
                <input
                  type="time"
                  className="w-full border px-3 py-2 rounded"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  *Sự kiện sẽ kết thúc vào giờ này của ngày bắt đầu
                </p>
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <label className="text-sm font-medium">Mô tả</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                rows={3}
                value={event?.description ?? ""}
                onChange={(e) => onChange("description", e.target.value)}
              />
            </div>

            {/* Action */}
            <div className="flex justify-end gap-3 mt-4 border-t pt-4">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
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
