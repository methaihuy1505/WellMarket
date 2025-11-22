
export default function Tabs({ current }) {
  const tabs = [
    { key: "profile", label: "Tổng quan" },
    { key: "favorited-by", label: "Người yêu thích tôi" },
    { key: "favorite-users", label: "Tôi đã yêu thích" },
    { key: "favorite-posts", label: "Bài đăng yêu thích" },
    { key: "payments", label: "Lịch sử giao dịch" },
    { key: "reviews", label: "Đánh giá từ tôi" },
    { key: "settings", label: "Cài đặt" },
  ];

  return (
    <div className="flex space-x-4 border-b mb-4">
      {tabs.map((t) => (
        <a
          key={t.key}
          href={`/profile?tab=${t.key}`}
          className={`py-2 px-4 ${
            current === t.key
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}