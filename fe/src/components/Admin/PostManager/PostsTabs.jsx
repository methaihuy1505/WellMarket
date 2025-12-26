// PostsTabs.jsx
export default function PostsTabs({ tab, setTab }) {
  return (
    <div className="flex gap-6 border-b pb-2 mb-4">
      <button
        className={tab === "posts" ? "font-semibold" : "text-gray-500"}
        onClick={() => setTab("posts")}
      >
        Bài đăng
      </button>
      <button
        className={tab === "reports" ? "font-semibold" : "text-gray-500"}
        onClick={() => setTab("reports")}
      >
        Báo cáo
      </button>
      <button
        className={tab === "blocked" ? "font-semibold" : "text-gray-500"}
        onClick={() => setTab("blocked")}
      >
        Bị chặn
      </button>
    </div>
  );
}
