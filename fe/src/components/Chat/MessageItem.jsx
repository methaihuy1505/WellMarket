// src/components/chat/MessageItem.jsx
export default function MessageItem({ message, currentUserId }) {
  const isMine = message.sender_id === currentUserId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="flex-col">
        {/* Nội dung tin nhắn */}
        <div
          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
            isMine ? "bg-pink-200 text-right" : "bg-white border"
          }`}
        >
          {message.content}
          {/* Nếu có attachments thì hiển thị thêm */}
          {message.attachments?.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((att) => (
                <div key={att.id}>
                  {att.type === "image" ? (
                    <img
                      src={att.url}
                      alt=""
                      className="max-w-[150px] rounded-lg border"
                    />
                  ) : (
                    <video
                      src={att.url}
                      controls
                      className="max-w-[150px] rounded-lg border"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thời gian gửi */}
        <div
          className={`text-xs text-gray-400 mt-1 ${isMine ? "text-right" : ""}`}
        >
          {new Date(
            message.created_at || message.createdAt
          ).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
