import { useState } from "react";
import ImageUpload from "./UpImage";
import VideoUpload from "./UpVideo";
export default function CreatePostForm() {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    const [form, setForm] = useState({
        category: "",
        productName: "",
        description: "",
        quantity: "",
        warranty: "",
        price: "",
        condition: "",
        address: "",
        phone: "",
        email: "",
        images: [],
        videos: [],
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = (field, files) => {
        setForm((prev) => ({ ...prev, [field]: Array.from(files) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        alert("Đã gửi dữ liệu lên console!");
    };

    return (

        <div className="max-w-5xl mt-10 mx-auto p-6 bg-white border border-gray-300 border-solid rounded shadow">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    {/* ================= HÌNH ẢNH & VIDEO ================ */}
                    <h2 className="text-xl font-semibold mb-3">Hình ảnh và Video sản phẩm</h2>

                    <div className="grid grid-cols-1 gap-6 mb-10">
                        <ImageUpload images={images} setImages={setImages} />
                        <VideoUpload videos={videos} setVideos={setVideos} />
                    </div>
                </div>
                <div className="col-span-3">
                    {/* ================= THÔNG TIN CHI TIẾT ================= */}
                    <h2 className="text-xl font-semibold mb-3">Thông tin chi tiết</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Danh mục */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Danh mục *</label>
                                <input
                                    type="text"
                                    value={form.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                    placeholder="VD: Laptop"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Tên sản phẩm *</label>
                                <input
                                    type="text"
                                    value={form.productName}
                                    onChange={(e) => handleChange("productName", e.target.value)}
                                    placeholder="VD: Laptop Dell XPS 13"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Tình trạng *</label>
                                <input
                                    type="text"
                                    value={form.condition}
                                    onChange={(e) => handleChange("condition", e.target.value)}
                                    placeholder="VD: Mới 99%"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Giá bán *</label>
                                <input
                                    type="text"
                                    value={form.price}
                                    onChange={(e) => handleChange("price", e.target.value)}
                                    placeholder="VD: 12.000.000"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Số lượng</label>
                                <input
                                    type="number"
                                    value={form.quantity}
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Bảo hành</label>
                                <input
                                    type="text"
                                    value={form.warranty}
                                    onChange={(e) => handleChange("warranty", e.target.value)}
                                    placeholder="VD: 6 tháng"
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* ================= TIÊU ĐỀ & MÔ TẢ ================= */}
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Tiêu đề tin đăng & mô tả chi tiết</h2>

                            <label className="text-sm text-gray-600">Tiêu đề tin đăng *</label>
                            <input
                                type="text"
                                value={form.productName}
                                onChange={(e) => handleChange("productName", e.target.value)}
                                placeholder="VD: Laptop Dell XPS 13 - i7 - 16GB"
                                className="mt-1 w-full border rounded px-3 py-2 mb-4"
                            />

                            <label className="text-sm text-gray-600">Mô tả chi tiết *</label>
                            <textarea
                                rows={6}
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="- Tình trạng sản phẩm
- Thời gian sử dụng
- Phụ kiện kèm theo
- Lý do bán..."
                                className="mt-1 w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* ================= THÔNG TIN NGƯỜI BÁN ================= */}
                        <h2 className="text-xl font-semibold">Thông tin người bán</h2>

                        <div>
                            <label className="text-sm text-gray-600">Địa chỉ *</label>
                            <input
                                type="text"
                                value={form.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                placeholder="VD: Phường 5, Quận 10, TP.HCM"
                                className="mt-1 w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Số điện thoại *</label>
                                <input
                                    type="text"
                                    value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="mt-1 w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
                            >
                                Đăng tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
