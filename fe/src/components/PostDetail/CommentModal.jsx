import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "../../utils/axios";

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
      <div className="bg-white w-full max-w-lg rounded-xl p-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">Tất cả bình luận</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
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

        <div className="mt-4 border-t pt-3">
          {replyTo && (
            <div className="text-xs text-gray-500 mb-1">
              Trả lời {replyTo.name}
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
              placeholder="Viết bình luận..."
            />
            <button onClick={submit}>✈️</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function CommentItem({ c, onReply, small }) {
  return (
    <div className={`flex gap-2 ${small ? "text-sm" : ""}`}>
      <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center text-white">
        {c.avatar || c.name?.[0]}
      </div>

      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg px-3 py-2">
          <div className="font-semibold">{c.name}</div>
          <div>{c.content}</div>
        </div>

        {!small && (
          <div className="text-xs text-gray-400 mt-1 flex gap-4">
            <button onClick={onReply}>Trả lời</button>
            <span>{c.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}
