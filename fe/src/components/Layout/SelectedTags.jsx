function SelectedTags({ options, selected, onRemove }) {
  const selectedOptions = options.filter((opt) =>
    Array.isArray(selected) ? selected.includes(opt.id) : selected === opt.id
  );

  if (selectedOptions.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {selectedOptions.map((opt) => (
        <div
          key={opt.id}
          className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
        >
          {opt.value || opt.name} {/* fallback nếu không có value */}
          <button
            onClick={() => onRemove(Array.isArray(selected) ? opt.id : null)}
            className="text-white text-xs ml-1"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
export default SelectedTags;
