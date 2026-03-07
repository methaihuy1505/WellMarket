import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import PostGrid from "../components/Layout/PostGrid";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import PriceFilterDropdown from "../components/Filter/PriceFilterDropdown";
import CheckboxFilterDropdown from "../components/Filter/CheckboxFilterDropdown";
import RadioFilterDropdown from "../components/Filter/RadioFilterDropdown";
import SearchBar from "../components/Layout/SearchBar";

export default function SubCategoryPage() {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  // data
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [category, setCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [attributes, setAttributes] = useState([]);

  // filters
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedWarranty, setSelectedWarranty] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState("");

  /* =======================
     FETCH CATEGORY + FILTER OPTIONS
  ======================= */
  useEffect(() => {
    if (!subcategoryId) return;

    api
      .get(`/categories/${subcategoryId}`)
      .then((res) => {
        setCategory(res.data);
        setBrands(res.data.brands || []);
        setModels(res.data.models || []);
        setAttributes(res.data.attributes || []);
      })
      .catch(console.error);

    // reset khi đổi category
    setPosts([]);
    setMeta(null);
    setSelectedBrand(null);
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedAttributes({});
    setSelectedConditions([]);
    setSelectedWarranty([]);
    setPriceRange({ min: null, max: null });
    setActiveTab(0);
  }, [subcategoryId]);

  /* =======================
     FETCH MODELS BY BRAND
  ======================= */
  useEffect(() => {
    if (!selectedBrand || category?.models?.length) return;

    api
      .get(`/brands/${selectedBrand}/models`)
      .then((res) => {
        setModels(res.data || []);
        setModels((prev) => res.data || []); // Cập nhật models
        setSelectedModels([]);
      })
      .catch(console.error);
  }, [selectedBrand, category]);

  /* =======================
     FETCH POSTS (CORE)
  ======================= */
  const fetchPosts = useCallback(
    async (page = 1) => {
      const params = {
        category: subcategoryId,
        price_min: priceRange.min,
        price_max: priceRange.max,
        brands: selectedBrand ? [selectedBrand] : selectedBrands,
        models: selectedModels,
        attributes: selectedAttributes,
        item_condition: selectedConditions,
        warranty: selectedWarranty,
        page,
        per_page: 20,
      };

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
      } catch (e) {
        console.error("Fetch posts error:", e);
      }
    },
    [
      subcategoryId,
      priceRange,
      selectedBrand,
      selectedBrands,
      selectedModels,
      selectedAttributes,
      selectedConditions,
      selectedWarranty,
      activeTab,
      keyword,
    ]
  );

  /* =======================
     DEBOUNCED FETCH
  ======================= */
  useEffect(() => {
    if (!subcategoryId) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPosts(1);
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [fetchPosts, subcategoryId]);

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
    // Banner trang này thấp hơn nên threshold thấp hơn (khoảng 150px)
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =======================
     RENDER
  ======================= */
  return (
    <>
      <Header showSearch={isScrolled} onSearch={(val) => setKeyword(val)} />

      {/* --- 1. BANNER HEADER & BREADCRUMB (UI MỚI) --- */}
      <div className="bg-gray-50 border-b pt-6 pb-8 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Thanh điều hướng (Breadcrumb) */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-pink-600 transition-colors"
            >
              Trang chủ
            </button>
            <span>/</span>

            {/* Logic hiển thị Breadcrumb cha */}
            {category && category.parent_id && (
              <>
                <button
                  onClick={() => navigate(`/category/${category.parent_id}`)}
                  className="hover:text-pink-600 transition-colors font-medium text-gray-700"
                >
                  {/* Nếu API trả về tên parent thì tốt, không thì hiển thị tạm */}
                  {category.parent?.name || "Danh mục cha"}
                </button>
                <span>/</span>
              </>
            )}

            <span className="text-pink-600 font-bold">
              {category?.name || "..."}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                {category?.name || "Đang tải..."}
              </h1>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                Tìm thấy {meta?.total || 0} sản phẩm đang bán
              </p>
            </div>

            {/* Search Bar - Đặt vào vị trí nổi bật */}
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <SearchBar onSearch={(value) => setKeyword(value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* --- 2. FILTER TOOLBAR (UI MỚI) --- */}
        {category && (
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-4">
            {/* Tiêu đề marketing */}
            <div className="flex items-center gap-2 text-sm text-pink-600 font-bold uppercase tracking-wide border-b pb-2">
              <span>⚡ Bộ lọc tìm kiếm</span>
            </div>

            {/* Hàng bộ lọc chính */}
            <div className="flex gap-3 flex-wrap items-center">
              <PriceFilterDropdown
                value={priceRange}
                onChange={setPriceRange}
              />

              {/* LOGIC CŨ: Render Checkbox hoặc Radio tùy data */}
              {brands.length > 0 && category.models?.length > 0 && (
                <CheckboxFilterDropdown
                  label="Hãng"
                  options={brands.map((b) => ({ id: b.id, value: b.name }))}
                  selected={selectedBrands}
                  onChange={setSelectedBrands}
                />
              )}

              {brands.length > 0 &&
                (!category.models || category.models.length === 0) && (
                  <RadioFilterDropdown
                    label="Hãng"
                    options={brands.map((b) => ({ id: b.id, value: b.name }))}
                    selected={selectedBrand}
                    onChange={(brandId) => {
                      setSelectedBrand(brandId);
                      if (!brandId) {
                        setModels([]);
                        setSelectedModels([]);
                      }
                    }}
                  />
                )}

              {models.length > 0 && (
                <CheckboxFilterDropdown
                  label="Dòng sản phẩm"
                  options={models.map((m) => ({ id: m.id, value: m.name }))}
                  selected={selectedModels}
                  onChange={setSelectedModels}
                />
              )}

              {/* Attributes Dynamic */}
              {attributes.map((attr) => (
                <CheckboxFilterDropdown
                  key={attr.id}
                  label={attr.label}
                  options={attr.options.map((opt) => ({
                    id: opt.value,
                    value: opt.value,
                  }))}
                  selected={selectedAttributes[attr.id] || []}
                  onChange={(values) =>
                    setSelectedAttributes((prev) => ({
                      ...prev,
                      [attr.id]: values,
                    }))
                  }
                />
              ))}

              <CheckboxFilterDropdown
                label="Tình trạng"
                options={[
                  { id: "new", value: "Mới" },
                  { id: "used", value: "Đã sử dụng" },
                ]}
                selected={selectedConditions}
                onChange={setSelectedConditions}
              />

              <CheckboxFilterDropdown
                label="Bảo hành"
                options={[
                  { id: "yes", value: "Còn bảo hành" },
                  { id: "no", value: "Không bảo hành" },
                ]}
                selected={selectedWarranty}
                onChange={setSelectedWarranty}
              />
            </div>

            {/* Nút Xóa bộ lọc */}
            <div className="flex justify-end pt-2 border-t mt-2">
              <button
                onClick={() => {
                  setPriceRange({ min: null, max: null });
                  setSelectedBrand(null);
                  setSelectedBrands([]);
                  setSelectedModels([]);
                  setSelectedAttributes({});
                  setSelectedConditions([]);
                  setSelectedWarranty([]);
                  setModels([]);
                }}
                className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
              >
                <span>↺</span> Xoá toàn bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* --- 3. TABS (UI MỚI) --- */}
        <div className="flex gap-8 text-lg font-medium border-b pb-1">
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

        {/* --- POST GRID --- */}
        <PostGrid posts={posts} meta={meta} onLoadMore={handleLoadMore} />
      </div>

      <Footer />
    </>
  );
}
