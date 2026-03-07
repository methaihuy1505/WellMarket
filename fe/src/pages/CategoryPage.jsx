import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import PostGrid from "../components/Layout/PostGrid";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import SearchBar from "../components/Layout/SearchBar";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState("");

  /* =======================
     FETCH CATEGORY INFO
  ======================= */
  useEffect(() => {
    if (!categoryId) return;

    api
      .get(`/categories/${categoryId}`)
      .then((res) => setCategory(res.data))
      .catch(console.error);

    // reset khi đổi category
    setPosts([]);
    setMeta(null);
    setActiveTab(0);
    setKeyword(""); // Reset từ khóa tìm kiếm khi chuyển danh mục
  }, [categoryId]);

  /* =======================
     FETCH POSTS
  ======================= */
  const fetchPosts = useCallback(
    async (page = 1) => {
      const params = {
        category: categoryId,
        page,
        per_page: 20,
      };

      if (activeTab === 1) params.sort = "newest";
      if (activeTab === 2) params.has_video = true;

      // --- LOGIC SEARCH QUAN TRỌNG ---
      if (keyword) {
        params.keyword = keyword;
      }

      try {
        const res = await api.get("/posts", { params });
        setPosts((prev) =>
          page === 1 ? res.data.data : [...prev, ...res.data.data]
        );
        setMeta(res.data.meta);
      } catch (err) {
        console.error("Lỗi lấy posts:", err);
      }
    },
    [categoryId, activeTab, keyword] // Thêm keyword vào dependency
  );

  /* =======================
     DEBOUNCED FETCH
  ======================= */
  useEffect(() => {
    if (!categoryId) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPosts(1);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [fetchPosts, categoryId]);

  /* =======================
     LOAD MORE
  ======================= */
  const handleLoadMore = () => {
    if (meta && meta.current_page < meta.last_page) {
      fetchPosts(meta.current_page + 1);
    }
  };
  const [isScrolled, setIsScrolled] = useState(false); // State scroll

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header showSearch={isScrolled} onSearch={(val) => setKeyword(val)} />

      {/* --- BANNER HEADER (MARKETING UI) --- */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 pb-16 pt-8 px-4 mb-8 text-center text-white relative shadow-lg">
        {/* Nút quay về nhỏ ở góc */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-white/80 hover:text-white text-sm flex items-center gap-1"
        >
          ← Trang chủ
        </button>

        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide drop-shadow-md">
          {category?.name || "Đang tải..."}
        </h1>
        <p className="opacity-90 mb-6 text-sm font-light">
          Khám phá hàng ngàn sản phẩm chất lượng trong danh mục này
        </p>

        {/* Search Bar nổi bật ở giữa Banner */}
        <div className="max-w-2xl mx-auto transform translate-y-4">
          <SearchBar onSearch={(value) => setKeyword(value)} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-10 mt-6">
        {/* --- DANH MỤC CON (SUB CATEGORIES) --- */}
        {category?.subs?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
              Danh mục phổ biến
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.subs.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => navigate(`/subcategory/${sc.id}`)}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-32 overflow-hidden relative">
                    {sc.image_url ? (
                      <img
                        src={sc.image_url}
                        alt={sc.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                    {/* Overlay gradient nhẹ khi hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-semibold text-gray-700 group-hover:text-pink-600 transition-colors text-sm">
                      {sc.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MAIN CONTENT & TABS --- */}
        <section>
          <div className="flex gap-8 text-lg font-medium border-b pb-1 mb-6">
            {["Dành cho bạn", "Mới nhất", "Video"].map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`transition-colors relative pb-2 px-1 ${
                  activeTab === i
                    ? "text-pink-600 font-bold after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-pink-600 after:rounded-full"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <PostGrid posts={posts} meta={meta} onLoadMore={handleLoadMore} />
        </section>
      </div>
      <Footer />
    </>
  );
}
