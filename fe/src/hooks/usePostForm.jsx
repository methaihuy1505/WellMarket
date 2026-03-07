import { useState, useRef } from "react";
import { uploadToCloudinary } from "../utils/UploadToCloudinary";
import api from "../utils/api";

export default function usePostForm(initial = {}) {
  const [form, setForm] = useState({
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    attributes: {}, // {attrId: value}
    title: "",
    description: "",
    warranty: "",
    price: "",
    priceRaw: "",
    condition: "",
    address: "",
    images: [],
    videos: [],
    ...initial,
  });

  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState("");
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const refs = useRef({});

  const formatPrice = (value) => {
    if (!value) return "";
    const digits = value.replace(/[^\d]/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handlers
  const handleChange = (field, value) => {
    if (field === "price") {
      const raw = value.replace(/[^\d]/g, "");
      setForm((prev) => ({ ...prev, price: formatPrice(raw), priceRaw: raw }));
      setErrors((prev) => ({ ...prev, price: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCategoryChange = (value) => {
    setForm((prev) => ({
      ...prev,
      category: value,
      subCategory: "",
      brand: "",
      model: "",
    }));
    setErrors((prev) => ({ ...prev, category: "", subCategory: "" }));
  };

  // validate
  const validate = (images = [], videos = [], options = {}) => {
    const { hasSubCategory = false, hasBrand = false } = options;
    const newErrors = {};

    if (!form.category) newErrors.category = "Vui lòng chọn danh mục";

    // chỉ validate subCategory nếu category có subcategories
    if (hasSubCategory && !form.subCategory) {
      newErrors.subCategory = "Vui lòng chọn danh mục nhỏ";
    }

    // chỉ validate brand nếu category yêu cầu brand
    if (hasBrand && !form.brand) {
      newErrors.brand = "Vui lòng chọn hãng";
    }

    // model luôn bắt buộc
    if (!form.model) newErrors.model = "Vui lòng chọn dòng sản phẩm";

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

    if (!images || images.length === 0)
      newErrors.images = "Bạn phải tải lên ít nhất 1 ảnh.";
    if (images.length > 6) newErrors.images = "Tối đa 6 ảnh.";
    if (videos.length > 1) newErrors.videos = "Tối đa 1 video.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const order = [
        "category",
        "subCategory",
        "brand",
        "model",
        "title",
        "condition",
        "warranty",
        "price",
        "description",
        "images",
        "videos",
        "address",
      ];
      for (const key of order) {
        if (newErrors[key]) {
          if (key === "images" || key === "videos") {
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
  // send data
  const sendData = async (images, videos, form) => {
    const imageIds = [];
    for (const img of images) {
      const id = await uploadToCloudinary(img.file, "image");
      if (id) imageIds.push(id);
    }

    const videoIds = [];
    for (const vid of videos) {
      const id = await uploadToCloudinary(vid.file, "video");
      if (id) videoIds.push(id);
    }

    const fd = new FormData();
    fd.append("category_id", form.subCategory || form.category);
    fd.append("brand_id", form.brand || "");
    fd.append("model_id", form.model);
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("price", form.priceRaw || "0");
    fd.append("item_condition", form.condition);
    fd.append("location", form.address);
    fd.append("warranty", form.warranty || "");

    Object.entries(form.attributes || {}).forEach(([attrId, val]) => {
      fd.append(`attributes[${attrId}]`, val);
    });

    if (form.payment_id) {
      fd.append("payment_id", form.payment_id);
    }

    imageIds.forEach((id) => fd.append("images[]", id));
    videoIds.forEach((id) => fd.append("videos[]", id));

    const res = await api.post("/posts", fd, {
      headers: { "Content-Type": "multipart/form-data" },
      validateStatus: () => true,
    });

    if (res.status >= 400) {
      const err = new Error(res.data?.message || "Request failed");
      err.response = res;
      throw err;
    }

    return res.data;
  };

  return {
    form,
    setForm,
    setSubmitting,
    handleChange,
    handleCategoryChange,
    validate,
    sendData,
    errors,
    info,
    paymentRequired,
    paymentCompleted,
    setPaymentRequired,
    setPaymentCompleted,
    setInfo,
    setErrors,
    submitting,
    refs,
  };
}
