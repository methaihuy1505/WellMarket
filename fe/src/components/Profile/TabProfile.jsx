export default function TabProfile({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Thông tin tổng quan</h2>
      <p>Tên: {data.name}</p>
      <p>Số dư ví: {data.coins}</p>
      <p>Số người yêu thích tôi: {data.favorites}</p>
      <p>Số người đã yêu thích: {data.favorite_users}</p>
    </div>
  );
}
