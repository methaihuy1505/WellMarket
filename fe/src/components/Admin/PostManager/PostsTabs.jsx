// src/components/Admin/PostsManager/PostsTabs.jsx
export default function PostsTabs({ tab, setTab }) {
  return (
    <div className="flex gap-6 border-b pb-2 mb-4">
      <button
        className={
          tab === "posts"
            ? "font-semibold border-b-2 border-black"
            : "text-gray-500"
        }
        onClick={() => setTab("posts")}
      >
        Bài đăng
      </button>
      <button
        className={
          tab === "pending"
            ? "font-semibold border-b-2 border-black"
            : "text-gray-500"
        }
        onClick={() => setTab("pending")}
      >
        Chờ duyệt
      </button>
      <button
        className={
          tab === "reports"
            ? "font-semibold border-b-2 border-black"
            : "text-gray-500"
        }
        onClick={() => setTab("reports")}
      >
        Báo cáo
      </button>
    </div>
  );
}
