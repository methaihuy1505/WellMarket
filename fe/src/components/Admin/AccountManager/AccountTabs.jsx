export default function AccountTabs({ tab, setTab }) {
  return (
    <div className="flex gap-6 border-b pb-2 mb-4">
      {[
        ["accounts", "Tài khoản"],
        ["reports", "Báo cáo"],
        ["blocked", "Bị chặn"],
      ].map(([key, label]) => (
        <button
          key={key}
          className={tab === key ? "font-semibold" : "text-gray-500"}
          onClick={() => setTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
