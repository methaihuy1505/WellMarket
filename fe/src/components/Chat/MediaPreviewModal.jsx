export default function MediaPreviewModal({ media, onClose }) {
  if (!media) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative max-w-3xl w-full px-4">
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
