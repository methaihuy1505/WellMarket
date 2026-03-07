import React from "react";
import { fmtDate } from "../../../utils/utils";

export default function AccountModal({
  open,
  isEditing,
  loadingDetail,
  detail,
  detailMsg,
  saving,
  onClose,
  onEdit,
  onSave,
  setDetail,
  setIsEditing,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? "Sửa tài khoản" : "Chi tiết tài khoản"}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        {loadingDetail ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-4 flex flex-col items-center">
              <div className="w-40 h-40 rounded border overflow-hidden bg-gray-50">
                <img
                  src={
                    detail?.avatar ??
                    "/mnt/data/ea3bee50-9964-4c5b-a139-dd78dc24dfb3.png"
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <span className="px-3 py-1 rounded bg-gray-100 text-sm">
                  {detail?.role ?? "-"}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              {detailMsg && (
                <p className="text-yellow-600 mb-2">{detailMsg}</p>
              )}

              {!isEditing ? (
                <>
                  <p><b>Tên:</b> {detail?.name}</p>
                  <p><b>Email:</b> {detail?.email}</p>
                  <p><b>Túi xu:</b> {detail?.coins}</p>
                  <p><b>Ngày tạo:</b> {fmtDate(detail?.createdAt)}</p>

                  <div className="mt-4 flex justify-end gap-3">
                    <button className="border px-3 py-2" onClick={onClose}>
                      Đóng
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-2 rounded"
                      onClick={() => onEdit(detail.id)}
                    >
                      Sửa
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="w-full border px-3 py-2 mb-2"
                    value={detail?.name ?? ""}
                    onChange={(e) =>
                      setDetail((p) => ({ ...p, name: e.target.value }))
                    }
                  />

                  <input
                    className="w-full border px-3 py-2 mb-2"
                    value={detail?.email ?? ""}
                    onChange={(e) =>
                      setDetail((p) => ({ ...p, email: e.target.value }))
                    }
                  />

                  <input
                    type="password"
                    className="w-full border px-3 py-2 mb-2"
                    placeholder="Password mới (nếu đổi)"
                    value={detail?.password ?? ""}
                    onChange={(e) =>
                      setDetail((p) => ({
                        ...p,
                        password: e.target.value,
                      }))
                    }
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      className="border px-3 py-2"
                      onClick={() => {
                        setIsEditing(false);
                        onClose();
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className="bg-green-600 text-white px-3 py-2 rounded"
                      onClick={onSave}
                    >
                      {saving ? "Đang lưu..." : "Lưu"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
