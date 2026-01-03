import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { commentsMock } from "./Comment.mock";
import CommentModal from "./CommentModal";
import sendIcon from "../../assets/send.png";

export default function CommentBox({ userId, postId }) {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!userId) {
      setComments(commentsMock);
      return;
    }

    axios
      .get("/interactions", {
        params: { user_id: userId, interaction: "feedback" }
      })
      .then((res) => {
        const list = res?.data?.data || res?.data || [];
        setComments(list.length ? list : commentsMock);
      })
      .catch(() => setComments(commentsMock));
  }, [userId]);

  // ✅ GỬI COMMENT THƯỜNG (COMMENT POST)
  const submitComment = async () => {
    if (!text.trim() || !userId) return;

    setSending(true);
    try {
      await axios.post("/interactions", {
        user_id: userId,
        target_id: postId,
        target_type: "post",
        comment: text,
        interaction_type: "feedback"
      });

      // 👉 Optimistic UI
      setComments((prev) => [
        {
          id: Date.now(),
          name: "Bạn",
          content: text,
          time: "Vừa xong",
          replies: []
        },
        ...prev
      ]);

      setText("");
    } catch (e) {
      console.warn("Send comment failed", e);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl border-2 border-pink-100 rounded-lg space-y-4">
        <h3 className="font-semibold">Bình luận</h3>

        {/* LIST */}
        {comments.slice(0, 3).map((c) => (
          <div key={c.id}>
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="text-sm text-gray-700">{c.content}</div>
          </div>
        ))}

        {/* XEM TẤT CẢ */}
        {comments.length > 3 && (
          <button
            className="text-sm hover:text-pink-500 hover:underline"
            onClick={() => setOpen(true)}
          >
            Xem tất cả {comments.length} bình luận
          </button>
        )}

        {/* INPUT COMMENT */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">
            H
          </div>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Viết bình luận..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
          />

          <button
            onClick={submitComment}
            disabled={sending}
            className="
    p-2 rounded-full
    transition-all duration-200 ease-out
    text-pink-400
    hover:text-pink-600 hover:bg-pink-300
    hover:scale-110
    active:scale-95
    disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent
  "
          >
            <img
              src={sendIcon}
              className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
              alt="send"
            />
          </button>

        </div>
      </div>

      {/* MODAL */}
      <CommentModal
        open={open}
        onClose={() => setOpen(false)}
        comments={comments}
        userId={userId}
        targetId={postId}
      />
    </>
  );
}
