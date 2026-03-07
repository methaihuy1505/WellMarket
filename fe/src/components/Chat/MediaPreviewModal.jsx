import { useEffect } from "react";

export default function MediaPreviewModal({ media, onClose }) {
  if (!media) return null;

  // Đóng bằng phím ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose} // click nền để đóng
    >
      <div
        className="relative max-w-3xl w-full px-4"
        onClick={(e) => e.stopPropagation()} // chặn click bên trong
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-xl"
        >
          ✕
        </button>

        {/* CONTENT */}
        {media.type === "image" ? (
          <img
            src={media.url}
            alt="preview"
            className="max-h-[80vh] mx-auto rounded"
          />
        ) : (
          <video
            src={media.url}
            controls
            autoPlay
            className="max-h-[80vh] mx-auto rounded"
          />
        )}
      </div>
    </div>
  );
}
