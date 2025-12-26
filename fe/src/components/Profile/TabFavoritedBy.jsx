export default function TabFavoritedBy({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Người yêu thích tôi</h2>
      {data.length === 0 ? (
        <p>Chưa có ai yêu thích bạn</p>
      ) : (
        data.map((u) => <p key={u.id}>{u.name}</p>)
      )}
    </div>
  );
}
