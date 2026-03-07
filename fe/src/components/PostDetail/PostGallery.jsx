import { useState } from "react";
import { createPortal } from "react-dom";

export default function PostGallery({ medias = [] }) {
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState(false);

  if (!medias.length) return null;

  const prev = () => {
    setIndex((i) => (i === 0 ? medias.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === medias.length - 1 ? 0 : i + 1));
  };

  // ===== Render media đúng loại =====
  const renderMedia = (media, opts = {}) => {
    const { isThumb = false, isPreview = false } = opts;

    if (media.type === "video") {
      return (
        <video
          src={media.url}
          muted={isThumb}
          controls={!isThumb}
          autoPlay={isPreview}
          controlsList="nodownload"
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <img
        src={media.url}
        className="w-full h-full object-cover"
        draggable={false}
      />
    );
  };

  return (
    <>
      <div className="flex gap-3">
        {/* THUMBNAILS */}
        <div className="flex flex-col gap-2">
          {medias.map((m, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-16 h-16 rounded overflow-hidden cursor-pointer border
                ${i === index ? "border-black" : "border-transparent"}
              `}
            >
              {renderMedia(m, { isThumb: true })}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="relative group flex-1">
          <div onClick={() => setPreview(true)} className="cursor-zoom-in">
            <div className="w-full h-[420px] rounded-lg overflow-hidden">
              {renderMedia(medias[index])}
            </div>
          </div>

          {medias.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {preview &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"
            onClick={() => setPreview(false)}
          >
            <div
              className="max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {renderMedia(medias[index], { isPreview: true })}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
