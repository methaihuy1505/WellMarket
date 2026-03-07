import { useNavigate } from "react-router-dom";

export default function Tabs({ current }) {
  const navigate = useNavigate();
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
    <div className="flex flex-col space-y-2 w-full">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => navigate(`/profile?tab=${t.key}`)}
          className={`text-left py-2 px-4 rounded w-full ${
            current === t.key
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
