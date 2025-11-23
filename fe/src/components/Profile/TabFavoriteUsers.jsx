export default function TabFavoriteUsers({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Tôi đã yêu thích</h2>
      {data.length === 0 ? (
        <p>Bạn chưa yêu thích ai</p>
      ) : (
        data.map((u) => <p key={u.id}>{u.name}</p>)
      )}
    </div>
  );
}
