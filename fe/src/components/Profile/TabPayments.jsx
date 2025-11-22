export default function TabPayments({ data }) {
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Lịch sử giao dịch</h2>
      {data.length === 0 ? (
        <p>Chưa có giao dịch nào</p>
      ) : (
        data.map((p) => (
          <p key={p.id}>
            {p.amount} VNĐ - {p.created_at}
          </p>
        ))
      )}
    </div>
  );
}
