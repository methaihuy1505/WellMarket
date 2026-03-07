import { useEffect, useState, useRef, useCallback } from "react";
import api from "../utils/api";
import PostGrid from "../components/Layout/PostGrid";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Layout/SearchBar";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  /* =======================
     FETCH CATEGORIES (ONCE)
  ======================= */
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  /* =======================
     FETCH POSTS
  ======================= */
  const fetchPosts = useCallback(
    async (page = 1) => {
      const params = { page, per_page: 20 };

      if (activeTab === 1) params.sort = "newest";
      if (activeTab === 2) params.has_video = true;
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
    [activeTab, keyword]
  );

  /* =======================
     DEBOUNCED SEARCH
  ======================= */
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchPosts(1); // Gọi API khi keyword thay đổi (sau 500ms)
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [fetchPosts, keyword]); // keyword thay đổi -> trigger

  /* =======================
     LOAD MORE
  ======================= */
  const handleLoadMore = () => {
    if (meta && meta.current_page < meta.last_page) {
      fetchPosts(meta.current_page + 1);
    }
  };
  // 1. Thêm state check scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. Lắng nghe sự kiện scroll
  useEffect(() => {
    const handleScroll = () => {
      // Khi cuộn quá 300px (chiều cao banner), set isScrolled = true
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Header showSearch={isScrolled} onSearch={(val) => setKeyword(val)} />

      {/* --- HERO SECTION (BANNER MARKETING) --- */}
      <div className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-orange-400 py-16 px-4 shadow-lg mb-10">
        {/* Pattern nền mờ (Optional) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative max-w-4xl mx-auto text-center text-white space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Tìm kiếm món đồ yêu thích của bạn
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-light">
            Mua bán nhanh chóng, tiện lợi và an toàn ngay hôm nay.
          </p>

          {/* Search Bar nằm chính giữa Banner */}
          <div className="pt-6 max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <SearchBar onSearch={(value) => setKeyword(value)} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-12">
        {/* --- DANH MỤC NỔI BẬT --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-3xl">🔥</span> Danh mục nổi bật
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="group cursor-pointer relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-20 h-20 mb-3 rounded-full overflow-hidden bg-gray-50 border-4 border-white shadow-sm group-hover:border-pink-100 transition-all">
                    {cat.image_url ? (
                      <img
                        src={cat.image_url}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-700 text-sm group-hover:text-pink-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Khám phá ngay
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- POST LIST --- */}
        <section>
          <div className="sticky top-[60px] bg-white/95 backdrop-blur z-20 py-3 mb-4 border-b">
            <div className="flex gap-8 text-lg font-medium">
              {["Dành cho bạn", "Mới nhất", "Video"].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`transition-colors relative pb-2 px-1 ${
                    activeTab === i
                      ? "text-pink-600 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-pink-600 after:rounded-full"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <PostGrid posts={posts} meta={meta} onLoadMore={handleLoadMore} />
        </section>
      </div>
      <Footer />
    </>
  );
}
