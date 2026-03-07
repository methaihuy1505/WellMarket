import CommentModal from "./CommentModal";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { LoginModal } from "../Modal/LoginModal";

export default function CommentBox({ userId, postId }) {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const token = userToken ?? adminToken;

  // Load comments từ backend
  useEffect(() => {
    if (!postId) return;

    api
      .get(`/posts/${postId}/comments`)
      .then((res) => {
        const list = Array.isArray(res?.data)
          ? res.data
          : res?.data?.data ?? [];
        setComments(list);
      })
      .catch((err) => {
        console.warn("Load comments failed", err);
        setComments([]);
      });
  }, [postId]);

  const submitComment = async () => {
    if (!text.trim() || !userId || !postId) return;
    // Nếu chưa đăng nhập thì mở LoginModal
    if (!token) {
      LoginModal.show();
      return;
    }
    setSending(true);
    try {
      await api.post(
        "/interactions",
        {
          user_id: userId,
          target_id: postId,
          target_type: "post",
          interaction_type: "feedback",
          comment: text,
          // parent_id: null // nếu sau này hỗ trợ reply, truyền parent_id khi cần
        }
      );

      // Optimistic UI
      setComments((prev) => [
        {
          id: Date.now(),
          name: "Bạn",
          content: text,
          time: "Vừa xong",
          replies: [],
        },
        ...prev,
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
      <div className="bg-white p-4 rounded-xl border space-y-4">
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
          <button className="text-sm underline" onClick={() => setOpen(true)}>
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
            className="text-gray-400 hover:text-green-600 disabled:opacity-50"
          >
            ✈️
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
