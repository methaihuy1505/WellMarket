export default function AccountSearch({
  search,
  setSearch,
  total,
  searchRef,
}) {
  return (
    <div className="flex mb-4 justify-between items-center">
      <input
        ref={searchRef}
        className="border px-3 py-2 rounded w-64"
        placeholder="Tìm kiếm theo tên, email hoặc ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="text-sm text-gray-500">{total} kết quả</div>
    </div>
  );
}
