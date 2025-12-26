import { useEffect, useState } from "react";

export default function ProductGrid({ apiData = [] }) {
  const tabs = ["Dành cho bạn", "Mới nhất", "Video"];
  const [active, setActive] = useState(0);

const [likedItems, setLikedItems] = useState({});

  const toggleLike = (idx) => {
    setLikedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };
  return (
    <div   className="max-w-6xl mx-auto mt-6">
      
      {/* Tabs */}
      <div className="flex gap-6 text-lg font-medium mb-4">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={
              "pb-1 " +
              (active === i
                ? "text-black border-b-2 border-blue-500"
                : "text-gray-500 hover:text-black")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {apiData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer duration-200"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-t-lg h-40 w-full object-cover"
              />

              <span className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-40 px-2 rounded">
                {item.time}
              </span>

              <span className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-40 px-2 text-white rounded">
                {item.mediaCount}
              </span>

                <button
                key={item.idx}
                onClick={() => toggleLike(idx)}
                className={`absolute top-2 right-2 px-2 py-1 text-sm rounded-full shadow ${likedItems[item.idx] ? "bg-red-100 text-red-500" : "bg-white text-gray-500"
                  }`}
              >
                {likedItems[idx] ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-[15px] font-medium line-clamp-2">{item.title}</p>

              <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                {item.desc}
              </p>

              <p className="text-pink-600 font-bold text-[17px] mt-1">
                {item.price} đ
              </p>

              <p className="text-gray-500 text-xs mt-1 flex gap-1 items-center">
                 {item.location}
              </p>

              <div className="flex justify-end mt-2">
                <button className="text-gray-600 text-xl">⋮</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
