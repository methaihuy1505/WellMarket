// src/components/Admin/PostsManager/PostModal.jsx
import React from "react";

export default function PostModal({
  open,
  mode,            // "view" | "edit" | "create"
  loading,         // đang load chi tiết
  saving,          // đang lưu (FIX lỗi saving is not defined)
  post,            // current post
  onClose,
  onSave,
  onChange,        // (field, value)
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === "view"
              ? "Chi tiết bài đăng"
              : mode === "edit"
              ? "Sửa bài đăng"
              : "Tạo bài đăng"}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : mode === "view" ? (
          /* ================= VIEW MODE ================= */
          <div className="space-y-3">
            <p><b>ID:</b> {post?.id}</p>
            <p><b>Tiêu đề:</b> {post?.title}</p>
            <p><b>Danh mục:</b> {post?.category}</p>
            <p><b>Giá:</b> {post?.price}</p>
            <p><b>Mô tả:</b> {post?.description}</p>

            <div className="flex justify-end mt-4">
              <button
                className="px-3 py-2 border rounded"
                onClick={onClose}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          /* ================= EDIT / CREATE MODE ================= */
          <div className="space-y-3">
            <div>
              <label className="text-sm">Tiêu đề</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={post?.title ?? ""}
                onChange={(e) => onChange("title", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Danh mục</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={post?.category ?? ""}
                onChange={(e) => onChange("category", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Giá</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded"
                value={post?.price ?? 0}
                onChange={(e) =>
                  onChange("price", Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="text-sm">Mô tả</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                rows={4}
                value={post?.description ?? ""}
                onChange={(e) =>
                  onChange("description", e.target.value)
                }
              />
            </div>

            {/* Actions */}
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
