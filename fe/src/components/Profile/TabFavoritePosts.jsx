export default function TabFavoritePosts({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Bài đăng yêu thích</h2>
      {data.length === 0 ? (
        <p>Chưa có bài đăng yêu thích</p>
      ) : (
        data.map((p) => <p key={p.id}>{p.title}</p>)
      )}
    </div>
  );
}
