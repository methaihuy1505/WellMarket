// src/components/chat/MessageInput.jsx
import { useRef, useState } from "react";
import axios from "../../utils/axios";

export default function MessageInput({ conversationId }) {
  const [files, setFiles] = useState([]); // preview files
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async () => {
    if (!text.trim() && files.length === 0) return;

    try {
      // gửi text
      if (text.trim()) {
        await axios.post("/messages", {
          conversationId,
          content: text,
          type: "text"
        });
      }

      // gửi media
      for (const item of files) {
        const formData = new FormData();
        formData.append("conversationId", conversationId);
        formData.append("file", item.file);
        formData.append("type", item.type);

        await axios.post("/messages/media", formData);
      }

      setText("");
      setFiles([]);
    } catch (err) {
      console.error("Send message failed", err);
    }
  };


  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files);

    const mapped = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image"
    }));

    setFiles(prev => [...prev, ...mapped]);

    e.target.value = "";
  };
  const removeFile = index => {
    setFiles(prev => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };


  return (
    <div className="bg-gray-50 px-2">
      <div
        className="bg-white p-4 mb-2 border-2 rounded-2xl border-pink-100 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* PREVIEW FILES */}
        {files.length > 0 && (
          <div className="flex gap-2 mt-2 mb-3 overflow-x-auto">
            {files.map((item, index) => (
              <div key={index} className="relative shrink-0">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.url}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xl bg-black/30 rounded-xl">
                      ▶
                    </div>
                  </div>
                )}

                {/* REMOVE */}
                <button
                  onClick={() => removeFile(index)}
                  className="
            absolute -top-2 -right-2
            w-6 h-6 rounded-full
            bg-black/70 text-white
            text-xs flex items-center justify-center
          "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        {/* INPUT ROW */}
        <div className="relative">
          <input
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Nhập tin nhắn"
            className="
              w-full
              rounded-2xl
              px-4
              py-3
              pr-14
              text-sm
              focus:outline-none
            "
          />

          {/* SEND */}
          <button
            onClick={sendMessage}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full
              bg-pink-100 hover:bg-pink-400
              flex items-center justify-center
              text-white
            "
          >
            <img src="./src\assets\search.png" alt="" className="w-6 h-5" />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={e => {
              e.stopPropagation();
              fileInputRef.current.click();
            }}
            className="
              flex items-center gap-1
              px-3 py-1.5
              bg-gray-100
              rounded-full
              text-sm
              text-gray-700
              hover:bg-gray-200
            "
          >
            Hình và video
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>

  );
}
