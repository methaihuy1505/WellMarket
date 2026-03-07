export default function ProductDetails({
  form,
  handleChange,
  handleCategoryChange,
  categories,
  subCategories = [],
  errors,
  refs,
  brands = [],
  models = [],
  attributes = [],
}) {
  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500";

  const labelClass = "block text-sm font-medium mb-1";

  const fieldWrapper = "mb-4";

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Giá bán */}
      <div className="mb-4 col-span-2">
        <label className="block text-sm font-medium mb-1">Giá bán *</label>
        <input
          type="text"
          ref={(el) => (refs.current.price = el)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Nhập giá sản phẩm"
          value={form.price}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            handleChange("price", formatted);
          }}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      {/* Category */}
      <div className={fieldWrapper}>
        <label className={labelClass}>Danh mục *</label>
        <select
          ref={(el) => (refs.current.category = el)}
          className={inputClass}
          value={form.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* SubCategory */}
      {subCategories.length > 0 && (
        <div className={fieldWrapper}>
          <label className={labelClass}>Danh mục nhỏ *</label>
          <select
            ref={(el) => (refs.current.subCategory = el)}
            className={inputClass}
            value={form.subCategory}
            onChange={(e) => handleChange("subCategory", e.target.value)}
          >
            <option value="">-- Chọn danh mục nhỏ --</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>
          )}
        </div>
      )}

      {/* Brand */}
      {brands.length > 0 && (
        <div className={fieldWrapper}>
          <label className={labelClass}>
            Hãng {models.length === 0 ? "*" : ""}
          </label>
          <select
            ref={(el) => (refs.current.brand = el)}
            className={inputClass}
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          >
            <option value="">-- Chọn hãng --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
          )}
        </div>
      )}

      {/* Model */}
      <div className={fieldWrapper}>
        <label className={labelClass}>Dòng sản phẩm *</label>
        <select
          ref={(el) => (refs.current.model = el)}
          className={inputClass}
          value={form.model}
          onChange={(e) => handleChange("model", e.target.value)}
        >
          <option value="">-- Chọn dòng sản phẩm --</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        {errors.model && (
          <p className="text-red-500 text-sm mt-1">{errors.model}</p>
        )}
      </div>

      {/* Condition */}
      <div className={fieldWrapper}>
        <label className={labelClass}>Tình trạng *</label>
        <select
          ref={(el) => (refs.current.condition = el)}
          className={inputClass}
          value={form.condition}
          onChange={(e) => handleChange("condition", e.target.value)}
        >
          <option value="">-- Chọn tình trạng --</option>
          <option value="new">Mới</option>
          <option value="used">Đã qua sử dụng</option>
        </select>
        {errors.condition && (
          <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
        )}
      </div>

      {/* Warranty */}
      <div className={fieldWrapper}>
        <label className={labelClass}>Bảo hành *</label>
        <select
          ref={(el) => (refs.current.warranty = el)}
          className={inputClass}
          value={form.warranty}
          onChange={(e) => handleChange("warranty", e.target.value)}
        >
          <option value="">-- Chọn bảo hành --</option>
          <option value="no">Không bảo hành</option>
          <option value="1m">1 tháng</option>
          <option value="3m">3 tháng</option>
          <option value="6m">6 tháng</option>
          <option value="12m">12 tháng</option>
        </select>
        {errors.warranty && (
          <p className="text-red-500 text-sm mt-1">{errors.warranty}</p>
        )}
      </div>

      {/* Attributes */}
      {attributes.length > 0 &&
        attributes.map((attr) => (
          <div key={attr.id} className={fieldWrapper}>
            <label className={labelClass}>{attr.label || attr.name}</label>
            {attr.options && attr.options.length > 0 ? (
              <select
                className={inputClass}
                value={form.attributes?.[attr.id] || ""}
                onChange={(e) =>
                  handleChange("attributes", {
                    ...form.attributes,
                    [attr.id]: e.target.value,
                  })
                }
              >
                <option value="">-- Chọn {attr.label || attr.name} --</option>
                {attr.options.map((opt) => (
                  <option key={opt.id} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className={inputClass}
                placeholder={`Nhập ${attr.label || attr.name}`}
                value={form.attributes?.[attr.id] || ""}
                onChange={(e) =>
                  handleChange("attributes", {
                    ...form.attributes,
                    [attr.id]: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
    </div>
  );
}
