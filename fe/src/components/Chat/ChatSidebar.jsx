// src/components/chat/ChatSidebar.jsx
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { mediaMock } from "./Mock/media.mock";
import MediaPreviewModal from "./MediaPreviewModal";


export default function ChatSidebar({ conversation }) {
  const [mediaList, setMediaList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const displayedMedia = mediaList.slice(0, visibleCount);
  const placeholders = Math.max(0, 12 - displayedMedia.length);
  useEffect(() => {
    loadMedia();
    setVisibleCount(12);
  }, [conversation.id]);

  const loadMedia = async () => {
    try {
      const res = await axios.get(
        `/conversations/${conversation.id}/media`
      );

      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : null;

      setMediaList(list && list.length > 0 ? list : mediaMock);
    } catch (err) {
      console.warn("Load media fail → use mock");
      setMediaList(mediaMock);
    }
  };



  return (
    <div className="w-80 h-full bg-gray-50 flex flex-col">
      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {/* USER INFO */}
        <div className="text-center mt-2  bg-white border-2 border-pink-100 rounded-lg p-4">
          <img
            src={conversation.avatar}
            className="w-16 h-16 rounded-full mx-auto"
          />
          <div className="mt-2 font-semibold">
            {conversation.name}
          </div>
          <button className="mt-2 px-4 py-1 border rounded text-sm hover:shadow-lg hover:shadow-gray-500 ">
            Xem Trang
          </button>
        </div>

        {/* MEDIA */}
        <div className="bg-white border-2 border-pink-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Ảnh và video</div>


          </div>

          {mediaList.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 min-h-[440px]">
              {displayedMedia.map(item => (
                <div
                  key={item.id}
                  onClick={() => setPreview(item)}
                  className="relative cursor-pointer group"
                >
                  <img
                    src={item.type === "video" ? item.thumbnail : item.url}
                    className="w-full h-20 object-cover rounded"
                  />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm">
                        ▶
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* PLACEHOLDER */}
              {Array.from({ length: placeholders }).map((_, i) => (
                <div
                  key={`ph-${i}`}
                  className="w-full h-20 rounded bg-white"
                />
              ))}
               {mediaList.length > visibleCount && (
          <button
            onClick={() => setVisibleCount(v => v + 6)}
            className="mt-3 text-sm text-blue-500 hover:underline"
          >
            Xem thêm
          </button>
        )}
            </div>
          ) : (
            <div className="border rounded p-3 text-sm text-gray-500">
              Chưa có hình ảnh hoặc video
            </div>
          )}
        </div>
       
        {/* MODAL */}
        <MediaPreviewModal
          media={preview}
          onClose={() => setPreview(null)}
        />

        {/* ACTIONS */}
        <div className="space-y-0 text-sm bg-white border-2 border-pink-100 rounded-lg ">
          <button className="flex w-full p-2 items-center text-gray-500 gap-2 hover:text-black hover:bg-gray-100 ">
            Báo cáo
          </button>
          <button className="flex w-full p-2 items-center text-gray-500 gap-2 hover:text-black hover:bg-gray-100">
            Chặn người dùng
          </button>
          <button className="flex w-full p-2 items-center text-gray-500 gap-2 hover:text-black hover:bg-gray-100">
            Đánh dấu tin nhắn rác
          </button>
          <button className="flex w-full p-2 items-center text-gray-500 gap-2 hover:text-black hover:bg-gray-100">
            Ẩn hội thoại
          </button>
        </div>
      </div>

    </div>
  );
}
