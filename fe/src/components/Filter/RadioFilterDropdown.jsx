import { useState, useRef, useEffect } from "react";

export default function RadioFilterDropdown({
  label,
  options,
  selected,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected || null);
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

  const applyFilter = () => {
    onChange(tempSelected);
    setOpen(false);
  };

  const clearFilter = () => {
    setTempSelected(null);
    onChange(null);
    setOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.id === selected)?.value;
  const isFiltered = !!selected;

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
        {isFiltered ? selectedLabel : label}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-300 rounded-xl shadow p-4 space-y-4">
          <div className="text-sm font-medium">{label}</div>
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={label}
                  checked={tempSelected === opt.id}
                  onChange={() => setTempSelected(opt.id)}
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
