import { useRef, useState, useEffect } from "react";

export default function VideoUpload({ videos, setVideos }) {
  const fileInputRef = useRef();
  const [error, setError] = useState("");

  const MAX_VIDEOS = 2;
  const MAX_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_DURATION = 60; // seconds

  const validateVideo = (file) => {
    if (!file.type.startsWith("video/")) {
      return "File không phải video!";
    }
    if (file.size > MAX_SIZE) {
      return "Dung lượng video tối đa 20MB.";
    }
    return null;
  };

  // Tạo thumbnail và kiểm tra duration bằng HTMLVideoElement + canvas
  const createThumbnailAndCheckDuration = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");

      let cleaned = false;
      const cleanup = () => {
        if (!cleaned) {
          video.src = "";
          URL.revokeObjectURL(url);
          cleaned = true;
        }
      };

      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.src = url;

      // loadedmetadata để lấy duration
      const onLoadedMetadata = () => {
        const duration = video.duration;
        if (!isFinite(duration) || isNaN(duration)) {
          cleanup();
          reject("Không thể đọc thời lượng video.");
          return;
        }
        if (duration > MAX_DURATION) {
          cleanup();
          reject(
            `Thời lượng video phải ≤ ${MAX_DURATION}s (file này ${Math.round(
              duration
            )}s).`
          );
          return;
        }

        // Seek tới vị trí giữa video hoặc 0.5s nếu ngắn
        const seekTime = Math.min(1, Math.max(0.1, duration / 2));

        // xử lý seek
        const onSeeked = () => {
          try {
            // vẽ frame lên canvas
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 320;
            canvas.height = video.videoHeight || 180;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8); // base64 jpeg
            cleanup();
            resolve({ duration, thumbnailUrl, objectUrl: url });
          } catch (err) {
            cleanup();
            reject("Không thể tạo thumbnail cho video.");
          }
        };

        // Lắng nghe seeked; nếu seek không xảy ra trong 1s thì fallback
        let seekTimeout = setTimeout(() => {
          // fallback: thử vẽ từ current frame mặc định
          try {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 320;
            canvas.height = video.videoHeight || 180;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
            cleanup();
            resolve({ duration, thumbnailUrl, objectUrl: url });
          } catch (err) {
            cleanup();
            reject("Không thể tạo thumbnail cho video (timeout).");
          }
        }, 1200);

        const handleSeekedOnce = () => {
          clearTimeout(seekTimeout);
          video.removeEventListener("seeked", handleSeekedOnce);
          onSeeked();
        };

        video.addEventListener("seeked", handleSeekedOnce);
        // bắt đầu seek
        try {
          video.currentTime = seekTime;
        } catch (err) {
          // một số trình duyệt chặn seek trước khi có đủ dữ liệu -> fallback sau timeout
        }
      };

      const onError = () => {
        cleanup();
        reject("Không thể đọc file video.");
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("error", onError);
      // Nếu browser không kích hoạt load (hiếm), set timeout để reject
      const metaTimeout = setTimeout(() => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("error", onError);
        cleanup();
        reject("Không thể đọc metadata video (timeout).");
      }, 5000);
      // Khi promise resolve/reject cleanup sẽ revoke object URL
      // Note: createThumbnailAndCheckDuration trả về objectUrl để chúng ta có thể dùng khi hiển thị hoặc revoke sau
    });

  // Xử lý file input: kiểm tra, tạo thumbnail, push vào state
  const handleFiles = async (filesList) => {
    setError("");
    let newVideos = [...videos];

    for (const file of filesList) {
      if (newVideos.length >= MAX_VIDEOS) {
        setError(`Chỉ được tải tối đa ${MAX_VIDEOS} video.`);
        break;
      }

      const vErr = validateVideo(file);
      if (vErr) {
        setError(vErr);
        continue;
      }

      try {
        // check duration + thumbnail
        const { duration, thumbnailUrl, objectUrl } =
          await createThumbnailAndCheckDuration(file);

        // Lưu object: file, url (objectUrl), thumbnailUrl, duration
        newVideos.push({ file, url: objectUrl, thumbnailUrl, duration });
      } catch (errMsg) {
        // errMsg có thể là string hoặc Error
        setError(typeof errMsg === "string" ? errMsg : "Lỗi khi xử lý video.");
        continue;
      }
    }

    setVideos(newVideos);
  };

  // Xoá video tại index và revoke object URLs nếu cần
  const removeAt = (index) => {
    const newList = videos.filter((_, i) => i !== index);
    // revoke the object URL of removed item (if exists)
    const removed = videos[index];
    if (removed && removed.url) {
      try {
        URL.revokeObjectURL(removed.url);
      } catch (e) {
        // ignore
      }
    }
    setVideos(newList);
  };

  // Cleanup when unmount: revoke all object URLs created by component
  useEffect(() => {
    return () => {
      videos.forEach((v) => {
        if (v && v.url) {
          try {
            URL.revokeObjectURL(v.url);
          } catch (e) {}
        }
      });
    };
  }, [videos]);

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-sm font-semibold">ⓘ</span>
        <span className="text-blue-600 text-sm">
          Video sản phẩm (≤ {MAX_DURATION}s, ≤ 20MB)
        </span>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      {/* Grid giống ImageUpload */}
      <div className="grid grid-cols-2 gap-5">
        {/* Add video button */}
        {videos.length < MAX_VIDEOS && (
          <div
            role="button"
            tabIndex={0}
            className="relative z-10 border-2 border-dashed border-orange-400 
             w-28 h-28 rounded bg-white flex justify-center items-center 
             cursor-pointer"
            onClick={() => fileInputRef.current.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current.click();
            }}
          >
            <span className="text-orange-500 text-3xl font-bold">+</span>
          </div>
        )}

        {/* Thumbnails */}
        {videos.map((vid, index) => (
          <div
            key={index}
            className="relative w-28 h-28 bg-black/5 rounded overflow-hidden border"
          >
            {/* Nếu có thumbnail, hiển thị <img>, ngược lại fallback video tag */}
            {vid.thumbnailUrl ? (
              <img
                src={vid.thumbnailUrl}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={vid.url}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            )}

            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Remove */}
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex justify-center items-center"
              onClick={() => removeAt(index)}
            >
              ✕
            </button>

            {/* Video bìa */}
            {index === 0 && (
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-t">
                Video bìa
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="video/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={async (e) => {
          setError("");
          if (e.target.files && e.target.files.length > 0) {
            await handleFiles(e.target.files);
          }
          // reset input để cho phép chọn lại file giống trước đó
          e.target.value = null;
        }}
      />
    </div>
  );
}
