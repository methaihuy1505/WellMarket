import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "../../utils/axios";
import sendIcon from "../../assets/send.png";

export default function CommentModal({
  open,
  onClose,
  comments,
  userId,
  targetId
}) {
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  // LOCK SCROLL
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    if (!text.trim()) return;

    await axios.post("/interactions", {
      user_id: userId,
      target_id: replyTo?.user_id || targetId,
      target_type: replyTo ? "user" : "post",
      comment: text,
      interaction_type: "feedback"
    });

    setText("");
    setReplyTo(null);
    onClose();
  };

 return createPortal(
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
    <div className="bg-white w-full max-w-lg rounded-xl flex flex-col h-[80vh]">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b flex-shrink-0">
        <h3 className="font-semibold">Tất cả bình luận</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {/* BODY – SCROLL */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {comments.map((c) => (
          <div key={c.id}>
            <CommentItem c={c} onReply={() => setReplyTo(c)} />
            {c.replies?.map((r) => (
              <div key={r.id} className="ml-10 mt-2">
                <CommentItem c={r} small />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t px-4 py-3 flex-shrink-0">
        {replyTo && (
          <div className="text-xs text-gray-500 mb-1">
            Trả lời {replyTo.name}
          </div>
        )}

        <div className="flex gap-2 items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
            placeholder="Viết bình luận..."
          />
          <button
            onClick={submit}
            className="group p-2 rounded-full hover:bg-gray-100 transition"
          >
            <img
              src={sendIcon}
              className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
              alt="send"
            />
          </button>
        </div>
      </div>

    </div>
  </div>,
  document.body
);

}

function CommentItem({ c, onReply, small }) {
  const hasAvatar = Boolean(c.avatar);

  return (
    <div className={`flex gap-2 ${small ? "text-sm" : ""}`}>
      {/* AVATAR */}
      <div className="h-8 w-8 rounded-full bg-pink-600 overflow-hidden flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
        {hasAvatar ? (
          <img
            src={c.avatar}
            alt={c.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          c.name?.[0]?.toUpperCase() || "U"
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg px-3 py-2">
          <div className="font-semibold">{c.name}</div>
          <div>{c.content}</div>
        </div>

        {!small && (
          <div className="text-xs text-gray-400 mt-1 flex gap-4">
            <button
              onClick={onReply}
              className="hover:underline"
            >
              Trả lời
            </button>
            <span>{c.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

