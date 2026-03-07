import { useState, useRef, useEffect } from "react";

export default function CheckboxFilterDropdown({
  label,
  options,
  selected = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);
  const dropdownRef = useRef();

  useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (id) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const applyFilter = () => {
    onChange(tempSelected);
    setOpen(false);
  };

  const clearFilter = () => {
    setTempSelected([]);
    onChange([]);
    setOpen(false);
  };

  // Hiển thị tên các option đã chọn
  const selectedLabels = options
    .filter((opt) => selected.includes(opt.id))
    .map((opt) => opt.value)
    .join(", ");

  const isFiltered = selected.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`px-4 py-1 border rounded-full text-sm ${
          isFiltered
            ? "bg-blue-500 text-white font-semibold"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        {isFiltered ? selectedLabels : label}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-300 rounded-xl shadow p-4 space-y-4">
          <div className="text-sm font-medium">{label}</div>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={tempSelected.includes(opt.id)}
                  onChange={() => toggleValue(opt.id)}
                />
                {opt.value}
              </label>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <button
              onClick={clearFilter}
              className="text-sm text-red-500 hover:underline"
            >
              Xóa lọc
            </button>
            <button
              onClick={applyFilter}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
