import { useRef, useState } from "react";

export default function VideoUpload({ videos, setVideos }) {
  const fileInputRef = useRef();
  const [error, setError] = useState("");

  const handleVideos = (files) => {
    let newVideos = [...videos];

    for (const file of files) {
      if (newVideos.length >= 2) {
        setError("Chỉ được tải tối đa 2 video.");
        break;
      }

      if (!file.type.startsWith("video/")) {
        setError("File không phải video!");
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        setError("Dung lượng video tối đa 20MB.");
        continue;
      }

      newVideos.push({ file, url: URL.createObjectURL(file) });
    }

    setVideos(newVideos);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-sm font-semibold">ⓘ</span>
        <span className="text-blue-600 text-sm">Video sản phẩm</span>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="grid grid-cols-4 gap-3">

        {/* Add video button */}
        {videos.length < 2 && (
          <div
            className="border-2 border-dashed border-orange-400 w-28 h-28 rounded flex justify-center items-center cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="text-orange-500 text-3xl font-bold">+</span>
          </div>
        )}

        {/* Video thumbnails */}
        {videos.map((vid, index) => (
          <div key={index} className="relative w-28 h-28">
            <video
              src={vid.url}
              className="w-full h-full object-cover rounded border"
            />

            <button
              className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex justify-center items-center"
              onClick={() =>
                setVideos(videos.filter((_, i) => i !== index))
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="video/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleVideos(e.target.files)}
      />
    </div>
  );
}
