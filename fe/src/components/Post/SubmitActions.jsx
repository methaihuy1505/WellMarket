import React from "react";

export default function SubmitActions({ onPreview, submitting }) {
  return (
    <div className="pt-4 flex justify-end space-x-3">
      <button
        type="button"
        onClick={onPreview}
        className="bg-white hover:bg-gray-100 text-black ring-1 ring-black px-4 py-2 rounded"
      >
        Xem trước
      </button>

      <button
        type="submit"
        disabled={submitting}
        className={`px-6 py-2 rounded ${
          submitting
            ? "bg-gray-300 text-gray-700"
            : "bg-pink-500 text-white hover:bg-pink-600"
        }`}
      >
        {submitting ? "Đang gửi..." : "Đăng tin"}
      </button>
    </div>
  );
}
