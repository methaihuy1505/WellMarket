// src/components/chat/MessageItem.jsx
export default function MessageItem({ message }) {
  const isMine = message.isMine;

  return (
    <div className={`flex  ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className="flex-col"
      >
        <div
          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${isMine
              ? "bg-pink-200 text-right"
              : "bg-white border"
            }`}
        >
          {message.content}
        </div>

        <div className={`text-xs text-gray-400 mt-1 ${isMine ?"text-right" :"" } `}
          >
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>

    </div>
  );
}
