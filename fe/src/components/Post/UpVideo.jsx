import { useRef, useState } from "react";

export default function VideoUpload({ videos, setVideos }) {
  const fileInputRef = useRef();
  const [error, setError] = useState("");

  const handleVideos = (files) => {
    let newVideos = [...videos];

    for (const file of files) {
      if (newVideos.length >= 1) {
        setError("Chỉ được tải tối đa 1 video.");
        break;
      }

      if (!file.type.startsWith("video/")) {
        setError("File không phải video!");
        continue;
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("Dung lượng video tối đa 50MB.");
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
        <span className="text-blue-600 text-sm">Video sản phẩm (tối đa 1)</span>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex gap-3 flex-wrap">
        {videos.map((vid, index) => (
          <div key={index} className="relative w-40 h-28">
            <video
              src={vid.url}
              controls
              className="w-full h-full rounded border"
            />
            <button
              className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex justify-center items-center"
              onClick={() => setVideos([])}
            >
              ✕
            </button>
          </div>
        ))}

        {videos.length < 1 && (
          <div
            className="w-40 h-28 border-2 border-dashed border-orange-400 flex items-center justify-center cursor-pointer bg-white rounded"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="text-orange-500 text-3xl font-bold">+</span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={(e) => handleVideos(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
