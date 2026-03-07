import { useState } from "react";

export default function PostDescription({ post }) {
  const [expanded, setExpanded] = useState(false);
  const text = post?.description ?? "";
  const ownerPhone = post?.post_phone ?? "";

  if (!post) return null;

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="font-semibold mb-2">Mô tả chi tiết</h2>

      {/* TEXT */}
      <div className="text-sm text-gray-700 whitespace-pre-line">
        <div className="relative">
          <div className={!expanded ? "max-h-28 overflow-hidden" : ""}>
            {text}
          </div>

          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white" />
          )}
        </div>

        {/* PHONE */}
        {ownerPhone && (
          <div className="mt-3">
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
              SĐT người bán: {ownerPhone}
            </span>
          </div>
        )}
      </div>

      {/* TOGGLE */}
      <div className="text-center mt-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-500 hover:underline"
        >
          {expanded ? "Thu gọn ▲" : "Xem thêm ▼"}
        </button>
      </div>
    </div>
  );
}
