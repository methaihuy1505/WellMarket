import React, { useState, useEffect } from "react"; // Thêm useEffect
import searchIcon from "../../assets/search.png";

export default function SearchBar({ onSearch, className = "" }) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(term);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className={`flex items-center rounded-full pl-4 pr-1 py-1 w-full transition-all ${
        className
          ? className
          : "bg-white shadow-lg focus-within:ring-2 focus-within:ring-pink-300"
      }`}
    >
      <input
        type="text"
        placeholder="Bạn đang tìm gì..."
        className="bg-transparent w-full text-sm outline-none px-2 text-gray-700 placeholder-gray-400 h-9"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full w-9 h-9 flex items-center justify-center transition-colors shrink-0"
      >
        <img
          src={searchIcon}
          alt="Search"
          className="w-4 h-4 object-contain brightness-0 invert"
        />
      </button>
    </div>
  );
}
