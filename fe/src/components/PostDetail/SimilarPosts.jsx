import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { similarPostsMock } from "./similarPosts.mock";

export default function SimilarPosts({ categoryId, currentPostId }) {
    const [posts, setPosts] = useState([]);

    // State cho nút like
    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        loadSimilar();
    }, [categoryId, currentPostId]);

    const loadSimilar = async () => {
        try {
            const res = await axios.get("/posts", { params: { category_id: categoryId } });
            const list = Array.isArray(res?.data)
                ? res.data
                : Array.isArray(res?.data?.data)
                    ? res.data.data
                    : [];

            const filtered = list.filter(p => p.id !== currentPostId).slice(0, 24);

            if (filtered.length > 0) {
                setPosts(filtered);
            } else {
                useMock(); // Gọi useMock mà không truyền vào setPosts
            }
        } catch (err) {
            console.warn("Load similar posts failed → use mock", err);
            useMock();
        }
    };

    const useMock = () => {
        const filteredMock = similarPostsMock.filter(p => p.id !== currentPostId).slice(0, 24);
        setPosts(filteredMock.length > 0 ? filteredMock : similarPostsMock.slice(0, 6));
    };

    // Hàm toggle like
    const toggleLike = (idx) => {
        setLikedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    if (!posts || posts.length === 0) return null;

    return (
        <div className="bg-white p-6 border-2 border-pink-100 rounded-lg ">
            <h2 className="font-semibold mb-3">Tin đăng tương tự</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                {posts.map((item, idx) => (
                    <div
                        key={item.id || idx}
                        className="bg-white rounded-lg shadow-sm border hover:shadow-lg cursor-pointer duration-200"
                    >
                        {/* Image */}
                        <div className="relative z-0">
                            <img
                                src={item.image || item.thumbnail || "/default-thumbnail.jpg"}
                                alt={item.title}
                                className="rounded-t-lg h-40 w-full object-cover"
                            />

                            {/* Overlay luôn hiển thị */}
                            <span className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-40 px-2 rounded z-10">
                                {item.time || ""}
                            </span>

                            <span className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-40 px-2 text-white rounded">
                                {item.mediaCount || 0}
                            </span>

                            {/* Nút like */}
                            <button
                                onClick={() => toggleLike(idx)}
                                className={`absolute top-2 right-2 px-2 py-1 text-sm rounded-full z-10 shadow ${likedItems[idx] ? "bg-red-100 text-red-500" : "bg-white text-gray-500"
                                    }`}
                            >
                                {likedItems[idx] ? "❤️" : "🤍"}
                            </button>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            <p className="text-[15px] font-medium line-clamp-2">{item.title || ""}</p>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-1">{item.desc || ""}</p>
                            <p className="text-pink-600 font-bold text-[17px] mt-1">{item.price || 0} đ</p>
                            <p className="text-gray-500 text-xs mt-1 flex gap-1 items-center">{item.location || ""}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
