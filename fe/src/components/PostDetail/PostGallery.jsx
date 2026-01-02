import { useState } from "react";
import { createPortal } from "react-dom";

export default function PostGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState(false);

  if (!images.length) return null;

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      <div className="flex gap-3">
        {/* THUMBNAILS - DỌC */}
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              className={`w-16 h-16 object-cover rounded cursor-pointer border
                ${i === index ? "border-black" : "border-transparent"}
              `}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="relative group flex-1">
          <img
            src={images[index]}
            onClick={() => setPreview(true)}
            className="w-full h-[420px] object-cover rounded-lg cursor-zoom-in"
          />

          {images.length > 1 && (
            <>
              {/* LEFT */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ‹
              </button>

              {/* RIGHT */}
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
            <img
              src={images[index]}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </>
  );
}
