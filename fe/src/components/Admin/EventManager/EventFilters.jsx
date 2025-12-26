// src/components/Admin/EventManager/EventFilters.jsx
import React from "react";

export default function EventFilters({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterGame,
  setFilterGame,
  filterFrom,
  setFilterFrom,
  filterTo,
  setFilterTo,
  gameTypes,
  onReset,
  resultCount,
  searchRef,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <input
        ref={searchRef}
        className="border px-3 py-2 rounded w-64"
        placeholder="Tìm theo tên, trò chơi, loại..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">Tất cả loại</option>
        <option value="day">Ngày</option>
        <option value="month">Tháng</option>
      </select>

      <select
        className="border px-3 py-2 rounded"
        value={filterGame}
        onChange={(e) => setFilterGame(e.target.value)}
      >
        <option value="">Tất cả loại trò chơi</option>
        {gameTypes.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={filterFrom}
        onChange={(e) => setFilterFrom(e.target.value)}
      />

      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={filterTo}
        onChange={(e) => setFilterTo(e.target.value)}
      />

      <button className="px-3 py-2 border rounded" onClick={onReset}>
        Reset
      </button>

      <div className="text-sm text-gray-500 ml-auto">
        {resultCount} kết quả
      </div>
    </div>
  );
}
