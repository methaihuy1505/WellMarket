import { useState, useEffect } from "react";
import ImageUpload from "./UpImage";
import VideoUpload from "./UpVideo";
import usePostForm from "../../hooks/usePostForm";
import ProductDetails from "./ProductDetails";
import TitleDescription from "./TitleDescription";
import SellerInfo from "./SellerInfo";
import PaymentModal from "./PaymentModal";
import SubmitActions from "./SubmitActions";
import useCategories from "../../hooks/useCategories";
import { LoginModal } from "../Modal/LoginModal";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function UpPostForm() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const {
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
  } = usePostForm();

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const token = userToken ?? adminToken;

  const { categories } = useCategories();

  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);

  // ===== Category =====
  useEffect(() => {
    if (!form.category) return;

    api.get(`/categories/${form.category}`).then((res) => {
      setSubCategories(res.data.subs || []);
      setBrands(res.data.brands || []);
      setModels(res.data.models || []);
      setAttributes(res.data.attributes || []);
    });
  }, [form.category]);

  // ===== SubCategory =====
  useEffect(() => {
    if (!form.subCategory) return;

    api.get(`/categories/${form.subCategory}`).then((res) => {
      setBrands(res.data.brands || []);
      setModels(res.data.models || []);
      setAttributes(res.data.attributes || []);
    });
  }, [form.subCategory]);

  // ===== Brand =====
  useEffect(() => {
    if (!form.brand) {
      setModels([]);
      return;
    }

    api.get(`/brands/${form.brand}/models`).then((res) => {
      setModels(res.data || []);
    });
  }, [form.brand]);

  // ===== Check fee (CẦN LOGIN) =====
  const checkFee = async (images, videos) => {
    const payload = {
      images_count: images.length,
      videos_count: videos.length,
    };

    const res = await api.post("/posts/check-fee", payload, {
      validateStatus: () => true,
    });

    return res.data;
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo("");
    setErrors({});

    if (!token) {
      LoginModal.show();
      return;
    }

    const ok = validate(images, videos, {
      hasSubCategory: subCategories.length > 0,
      hasBrand: brands.length > 0 && models.length === 0,
    });
    if (!ok) return;

    setSubmitting(true);

    try {
      const feeResult = await checkFee(images, videos);

      if (feeResult.need_payment) {
        setPaymentInfo({
          amount: feeResult.amount,
          breakdown: feeResult.breakdown,
        });
        setPaymentRequired(true);
        return;
      }

      await sendData(images, videos, form, token);
      setForm({});
      setInfo("Đăng bài thành công! Bài của bạn đang chờ duyệt.");
    } catch (err) {
      setInfo(
        err.response?.data?.message
          ? `Lỗi: ${err.response.data.message}`
          : "Có lỗi xảy ra, vui lòng thử lại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const goToCheckout = () => {
    setPaymentRequired(false);
    navigate("/checkout", {
      state: { form, images, videos, feeInfo: paymentInfo },
    });
  };

  return (
    <div className="max-w-5xl mt-10 mx-auto p-6 bg-pink-100 border rounded shadow">
      <div className="grid grid-cols-4 gap-4">
        {/* LEFT */}
        <div className="col-span-1">
          {submitting && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow flex items-center gap-3">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600">Đang xử lý...</span>
              </div>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-3">
            Hình ảnh và Video sản phẩm
          </h2>

          <div className="space-y-6 mb-4">
            <ImageUpload images={images} setImages={setImages} />
            <VideoUpload videos={videos} setVideos={setVideos} />
          </div>

          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images}</p>
          )}
          {errors.videos && (
            <p className="text-red-500 text-sm">{errors.videos}</p>
          )}

          {info && <p className="text-green-600 text-sm">{info}</p>}
        </div>

        {/* RIGHT */}
        <div className="col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TitleDescription
              form={form}
              handleChange={handleChange}
              errors={errors}
              refs={refs}
            />

            <h2 className="text-xl font-semibold mb-3">Thông tin chi tiết</h2>

            <ProductDetails
              form={form}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subCategories={subCategories}
              brands={brands}
              models={models}
              attributes={attributes}
              errors={errors}
              refs={refs}
            />

            <h2 className="text-xl font-semibold">Thông tin người bán</h2>
            <SellerInfo
              form={form}
              handleChange={handleChange}
              errors={errors}
              refs={refs}
            />

            <SubmitActions submitting={submitting} />
          </form>
        </div>
      </div>

      <PaymentModal
        open={paymentRequired}
        onCancel={() => setPaymentRequired(false)}
        onComplete={goToCheckout}
        amount={paymentInfo?.amount}
        breakdown={paymentInfo?.breakdown}
      />
    </div>
  );
}
