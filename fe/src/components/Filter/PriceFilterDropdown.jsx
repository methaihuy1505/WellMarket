import { useState, useRef, useEffect } from "react";

export default function PriceFilterDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(value.min || "");
  const [max, setMax] = useState(value.max || "");
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = () => {
    onChange({
      min: min ? parseInt(min) : null,
      max: max ? parseInt(max) : null,
    });
    setOpen(false);
  };

  const clearFilter = () => {
    setMin("");
    setMax("");
    onChange({ min: null, max: null });
    setOpen(false);
  };

  const isFiltered = value.min !== null || value.max !== null;

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
        {isFiltered
          ? `${value.min?.toLocaleString() || "0"}đ - ${
              value.max?.toLocaleString() || "∞"
            }`
          : "Giá"}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-300 rounded-xl shadow p-4 space-y-4">
          <div className="text-sm font-medium">Chọn khoảng giá</div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Giá tối thiểu"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Giá tối đa"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex justify-between">
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
