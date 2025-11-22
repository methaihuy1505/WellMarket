export default function TabReviews({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Đánh giá từ tôi</h2>
      {data.length === 0 ? (
        <p>Bạn chưa có đánh giá nào</p>
      ) : (
        data.map((r) => (
          <p key={r.id}>
            {r.content} - {r.created_at}
          </p>
        ))
      )}
    </div>
  );
}
