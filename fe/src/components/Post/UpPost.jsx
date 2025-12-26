import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageUpload from "./UpImage";
import VideoUpload from "./UpVideo";

export default function CreatePostForm() {
  const [images, setImages] = useState([]); // each item: { file, url, ... }
  const [videos, setVideos] = useState([]); // each item: { file, url, thumbnailUrl, duration }

  const [form, setForm] = useState({
    category: "",
    subCategory: "",
    productName: "",
    title: "", // Tiêu đề tin đăng (tách riêng)
    description: "",
    warranty: "",
    price: "", // formatted display (with commas)
    priceRaw: "", // numeric string without commas (for submit)
    condition: "",
    address: "",
    phone: "",
    email: "",
    images: [], // synced from images state
    videos: [], // synced from videos state
  });

  const [titleEdited, setTitleEdited] = useState(false); // true nếu user tự chỉnh title
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState(""); // general info message
  const [paymentRequired, setPaymentRequired] = useState(false); // show payment form
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Refs cho autofocus khi lỗi
  const refs = useRef({
    category: null,
    subCategory: null,
    productName: null,
    title: null,
    condition: null,
    price: null,
    description: null,
    address: null,
    phone: null,
    email: null,
    warranty: null,
  });

  // Danh mục (giữ nguyên)
  const categories = {
    "Đồ điện tử": [
      "Điện thoại",
      "Máy tính bảng",
      "Má tính xách tay",
      "Má tính để bàn",
      "Má ảnh, Máy quay",
      "Tivi",
      "Âm thanh",
      "Thiết bị đeo thông minh",
      "Phụ kiện (Màn hình, Chuột, ...)",
      "Linh kiện (RAM, Card, ...)",
    ],
    "Đồ gia dụng": [
      "Bàn ghế",
      "Tủ, kệ gia đình",
      "Giường, chăn ga gối nệm",
      "Bếp, lò, đồ điện nhà bếp",
      "Dụng cụ nhà bếp",
      "Quạt",
      "Đèn",
      "Cây cảnh, đồ trang trí",
      "Thiết bị vệ sinh, nhà tắm",
      "Nội thất, đồ gia dụng khác",
      "Tủ lạnh",
      "Điều hòa",
      "Máy giặt",
    ],
    "Thời trang": [
      "Quần áo",
      "Đồng hồ",
      "Giày dép",
      "Túi xách",
      "Nước hoa",
      "Phụ kiện thời trang khác",
    ],
  };

  const subCategories = form.category ? categories[form.category] || [] : [];

  // Helpers (formatPrice, formatPhone, groupDigits) - không đổi
  const formatPrice = (value) => {
    if (!value) return "";
    const digits = value.replace(/[^\d]/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatPhone = (input) => {
    if (!input) return "";
    let s = input.trim();
    const hasPlus = s.startsWith("+");
    s = s.replace(/[^\d]/g, "");
    if (s.startsWith("84")) {
      const rest = s.slice(2);
      return "+84 " + groupDigits(rest);
    }
    if (s.startsWith("0")) {
      const rest = s.slice(1);
      return "0" + groupDigits(rest);
    }
    if (hasPlus) return "+" + s.slice(0, 2) + " " + groupDigits(s.slice(2));
    return groupDigits(s);
  };

  const groupDigits = (digits) => {
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return digits.replace(/(\d{3})(\d{1,3})/, "$1 $2");
    if (digits.length <= 10) {
      const p1 = digits.slice(0, digits.length - 7);
      const p2 = digits.slice(digits.length - 7, digits.length - 4);
      const p3 = digits.slice(digits.length - 4);
      return [p1, p2, p3].filter(Boolean).join(" ");
    }
    return digits.replace(/(\d{3})(?=\d)/g, "$1 ");
  };

  // phone validation: accept either:
  // - digits starting with 0 and length 10 (e.g. 0901234567)
  // - digits starting with 84 and length 11 (e.g. 84901234567) (also accept +84 in original string)
  const isValidPhone = (rawInput) => {
    if (!rawInput) return false;
    const digits = String(rawInput).replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("0")) return true;
    if (digits.length === 11 && digits.startsWith("84")) return true;
    return false;
  };

  // handleChange
  const handleChange = (field, value) => {
    if (field === "price") {
      const raw = value.replace(/[^\d]/g, "");
      setForm((prev) => ({ ...prev, price: formatPrice(raw), priceRaw: raw }));
      setErrors((prev) => ({ ...prev, price: "" }));
      return;
    }

    if (field === "phone") {
      const formatted = formatPhone(value);
      setForm((prev) => ({ ...prev, phone: formatted }));
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    // Special: when productName changes, if title not edited by user, update title too
    if (field === "productName") {
      setForm((prev) => {
        const next = { ...prev, productName: value };
        if (!titleEdited) next.title = value; // auto-fill title only if title not manually edited
        return next;
      });
      setErrors((prev) => ({ ...prev, productName: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Title change by user -> mark titleEdited true so future productName changes won't override
  const handleTitleChange = (value) => {
    setForm((prev) => ({ ...prev, title: value }));
    setTitleEdited(true);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleCategoryChange = (value) => {
    setForm((prev) => ({ ...prev, category: value, subCategory: "" }));
    setErrors((prev) => ({ ...prev, category: "", subCategory: "" }));
  };

  // Sync images/videos to form when they change
  useEffect(() => {
    setForm((prev) => ({ ...prev, images }));
  }, [images]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, videos }));
  }, [videos]);

  // Validation helpers
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};

    if (!form.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!form.subCategory) newErrors.subCategory = "Vui lòng chọn danh mục nhỏ";
    if (!form.productName || !form.productName.trim())
      newErrors.productName = "Tên sản phẩm là bắt buộc";

    // Title must exist (we auto-fill from productName unless user clears). Make sure title not empty
    if (!form.title || !form.title.trim())
      newErrors.title = "Tiêu đề tin đăng là bắt buộc";

    if (!form.condition || !form.condition.trim())
      newErrors.condition = "Tình trạng là bắt buộc";
    if (!form.priceRaw) newErrors.price = "Giá bán là bắt buộc";
    if (!form.description || !form.description.trim())
      newErrors.description = "Mô tả chi tiết là bắt buộc";
    if (!form.warranty || form.warranty === "")
      newErrors.warranty = "Vui lòng chọn loại bảo hành";
    if (!form.address || !form.address.trim())
      newErrors.address = "Địa chỉ là bắt buộc";
    if (!form.phone || !form.phone.trim())
      newErrors.phone = "Số điện thoại là bắt buộc";
    else if (!isValidPhone(form.phone))
      newErrors.phone =
        "Số điện thoại không hợp lệ (VD: 0901234567 hoặc +84 901234567)";

    if (form.email && !isValidEmail(form.email))
      newErrors.email = "Email không hợp lệ";
    // New rules re: images & videos
    if (!images || images.length === 0)
      newErrors.images = "Bạn phải tải lên ít nhất 1 ảnh.";
    const hasVideo = videos && videos.length > 0;
    if (hasVideo) {
      // if there is video, max images = 6
      if (images.length > 6)
        newErrors.images = `Khi có video, tối đa 6 ảnh (hiện có ${images.length}).`;
      // if more than 3 images and hasVideo -> require payment flow (handled outside validate)
      if (images.length > 3) {
        newErrors.paymentNote =
          "Vì có video và >3 ảnh, cần thanh toán trước khi đăng.";
      }
    } else {
      if (images.length > 8) newErrors.images = "Tối đa 8 ảnh.";
    }

    setErrors(newErrors);

    // autofocus first error
    if (Object.keys(newErrors).length > 0) {
      const order = [
        "category",
        "subCategory",
        "productName",
        "title",
        "condition",
        "warranty",
        "price",
        "description",
        "images",
        "address",
        "phone",
        "email",
      ];
      for (const key of order) {
        if (newErrors[key]) {
          if (key === "images") {
            // can't focus images, leave as is
          } else if (refs.current[key]) {
            try {
              refs.current[key].focus();
            } catch (e) {}
          }
          break;
        }
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Function to actually send data via axios (FormData with files)
  const sendData = async () => {
    setSubmitting(true);
    setInfo("");
    try {
      const fd = new FormData();

      // Append simple fields
      fd.append("category", form.category);
      fd.append("subCategory", form.subCategory);
      fd.append("productName", form.productName);
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("warranty", form.warranty);
      fd.append("price", form.priceRaw || "0");
      fd.append("condition", form.condition);
      fd.append("address", form.address);
      fd.append("phone", form.phone);
      fd.append("email", form.email || "");

      // Append images (File objects)
      images.forEach((img, idx) => {
        if (img && img.file) fd.append(`images[${idx}]`, img.file);
      });

      // Append videos
      videos.forEach((vid, idx) => {
        if (vid && vid.file) fd.append(`videos[${idx}]`, vid.file);
      });

      // Example target URL - replace with your real endpoint
      const url = "http://localhost:8000/api/create-post";

      const res = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server trả về:", res.data);
      setInfo("Đăng tin thành công!");
      // reset form (optional)
      setForm({
        category: "",
        subCategory: "",
        productName: "",
        title: "",
        description: "",
        warranty: "",
        price: "",
        condition: "",
        address: "",
        phone: "",
        email: "",
        images: [],
        videos: [],
      });
      setImages([]);
      setVideos([]);
      setPaymentRequired(false);
      setPaymentCompleted(false);
      setErrors({});
      setTitleEdited(false);
    } catch (err) {
      console.error("Lỗi:", err);
      setInfo("Lỗi gửi dữ liệu. Xem console để biết chi tiết.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle submit: validate -> handle payment requirement if any -> sendData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo("");
    setErrors({});

    // 1) run validate (this will set errors.images if none)
    const ok = validate();
    if (!ok) return;

    const hasVideo = videos && videos.length > 0;
    if (hasVideo && images.length > 3 && !paymentCompleted) {
      // require payment before final submit
      setPaymentRequired(true);
      setInfo(
        "Cần thanh toán vì bạn có video + >3 ảnh. Vui lòng hoàn tất thanh toán giả lập."
      );
      return;
    }

    // All good -> send
    await sendData();
  };

  // Simulate payment form UI (simple)
  const handleFakePayment = () => {
    setPaymentCompleted(true);
    setPaymentRequired(false);
    setInfo("Thanh toán giả lập thành công — đang gửi dữ liệu...");
    setTimeout(() => {
      sendData();
    }, 500);
  };

  return (
    <div className="max-w-5xl mt-10 mx-auto p-6 bg-pink-100 border border-gray-300 border-solid rounded shadow">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-3">
            Hình ảnh và Video sản phẩm
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-4">
            <ImageUpload images={images} setImages={setImages} />
            <VideoUpload videos={videos} setVideos={setVideos} />
          </div>

          {/* image/video related error */}
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images}</p>
          )}
          {errors.paymentNote && (
            <p className="text-yellow-600 text-sm">{errors.paymentNote}</p>
          )}

          {/* info */}
          {info && <p className="text-green-600 text-sm">{info}</p>}
        </div>

        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-3">Thông tin chi tiết</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* DANH MỤC LỚN */}
              <div>
                <label className="text-sm text-gray-600">Danh mục *</label>
                <select
                  ref={(el) => (refs.current.category = el)}
                  value={form.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.category ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* DANH MỤC CON */}
              <div>
                <label className="text-sm text-gray-600">Danh mục nhỏ *</label>
                <select
                  ref={(el) => (refs.current.subCategory = el)}
                  value={form.subCategory}
                  onChange={(e) => handleChange("subCategory", e.target.value)}
                  disabled={!form.category}
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.subCategory ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Chọn danh mục nhỏ --</option>
                  {subCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.subCategory && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subCategory}
                  </p>
                )}
              </div>

              {/* TÊN SẢN PHẨM */}
              <div>
                <label className="text-sm text-gray-600">Tên sản phẩm *</label>
                <input
                  ref={(el) => (refs.current.productName = el)}
                  type="text"
                  value={form.productName}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  placeholder="VD: Laptop Dell XPS 13"
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.productName ? "border-red-500" : ""
                  }`}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productName}
                  </p>
                )}
              </div>

              {/* TÌNH TRẠNG */}
              <div>
                <label className="text-sm text-gray-600">Tình trạng *</label>
                <input
                  ref={(el) => (refs.current.condition = el)}
                  type="text"
                  value={form.condition}
                  onChange={(e) => handleChange("condition", e.target.value)}
                  placeholder="VD: Mới 99%"
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.condition ? "border-red-500" : ""
                  }`}
                />
                {errors.condition && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.condition}
                  </p>
                )}
              </div>

              {/* GIÁ BÁN */}
              <div>
                <label className="text-sm text-gray-600">Giá bán *</label>
                <input
                  ref={(el) => (refs.current.price = el)}
                  type="text"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="VD: 12,000,000"
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* BẢO HÀNH (bắt buộc) */}
              <div>
                <label className="text-sm text-gray-600">Bảo hành *</label>
                <select
                  ref={(el) => (refs.current.warranty = el)}
                  value={form.warranty}
                  onChange={(e) => handleChange("warranty", e.target.value)}
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.warranty ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Chọn bảo hành --</option>
                  <option value="expired">Hết bảo hành</option>
                  <option value="3">3 tháng</option>
                  <option value="6">6 tháng</option>
                  <option value="12">12 tháng</option>
                  <option value=">12">Trên 12 tháng</option>
                </select>
                {errors.warranty && (
                  <p className="text-red-500 text-sm mt-1">{errors.warranty}</p>
                )}
              </div>
            </div>

            {/* TIÊU ĐỀ & MÔ TẢ (mô tả sử dụng form.title hiện tại) */}
            {/* TIÊU ĐỀ (tách riêng, auto-fill từ productName nếu user chưa chỉnh) */}

            <div>
              <h2 className="text-xl font-semibold mb-3">
                Tiêu đề & mô tả chi tiết
              </h2>
              <div>
                <label className="text-sm text-gray-600">
                  Tiêu đề tin đăng *
                </label>
                <input
                  ref={(el) => (refs.current.title = el)}
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="VD: Laptop Dell XPS 13 - i7 - 16GB"
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <label className="text-sm text-gray-600">Mô tả chi tiết *</label>
              <textarea
                ref={(el) => (refs.current.description = el)}
                rows={6}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Viết mô tả..."
                className={`mt-1 w-full border rounded px-3 py-2 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* THÔNG TIN NGƯỜI BÁN */}
            <h2 className="text-xl font-semibold">Thông tin người bán</h2>

            <div>
              <label className="text-sm text-gray-600">Địa chỉ *</label>
              <input
                ref={(el) => (refs.current.address = el)}
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="VD: Phường 5, Quận 10, TP.HCM"
                className={`mt-1 w-full border rounded px-3 py-2 ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Số điện thoại *</label>
                <input
                  ref={(el) => (refs.current.phone = el)}
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="VD: 090 123 4567 hoặc +84 90 123 4567"
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  ref={(el) => (refs.current.email = el)}
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`mt-1 w-full border rounded px-3 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  const preview = {
                    ...form,
                    price: form.priceRaw,
                    images: images.map((i) => i.file?.name || i.url),
                    videos: videos.map((v) => v.file?.name || v.url),
                  };
                  console.log("Preview payload:", preview);
                  alert("Xem console để preview payload.");
                }}
                className="bg-white hover:bg-gray-100 text-black ring-1 ring-black px-4 py-2 rounded"
              >
                Xem trước
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 rounded ${
                  submitting
                    ? "bg-gray-300 text-gray-700"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                {submitting ? "Đang gửi..." : "Đăng tin"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Payment modal / simple panel */}
      {paymentRequired && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Thanh toán cần thiết</h3>
            <p className="mb-4">
              Bạn đang đăng kèm video và có hơn 3 ảnh. Vui lòng hoàn tất thanh
              toán giả lập để tiếp tục.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setPaymentRequired(false)}
                className="px-4 py-2 rounded border"
              >
                Hủy
              </button>
              <button
                onClick={handleFakePayment}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Thanh toán giả lập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
