import { useRef, useState } from "react";

export default function ImageUpload({ images, setImages }) {
    const fileInputRef = useRef();
    const [error, setError] = useState("");

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    const validateImage = (file) => {
        if (!validTypes.includes(file.type)) {
            return "Ảnh không hợp lệ! Chỉ nhận JPEG, PNG, WEBP.";
        }
        if (file.size > 5 * 1024 * 1024) {
            return "Dung lượng ảnh tối đa 5MB.";
        }
        return null;
    };

    const checkDimension = (file) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 600 || img.height < 600) {
                    resolve("Ảnh quá nhỏ! Kích thước tối thiểu 600x600px.");
                } else resolve(null);
            };
            img.src = URL.createObjectURL(file);
        });

    const handleFiles = async (files) => {
        let newImages = [...images];

        for (const file of files) {
            if (newImages.length >= 8) {
                setError("Bạn chỉ được tải lên tối đa 8 ảnh.");
                break;
            }

            // Validate format & size
            const msg = validateImage(file);
            if (msg) {
                setError(msg);
                continue;
            }

            // Validate dimension
            const dimensionError = await checkDimension(file);
            if (dimensionError) {
                setError(dimensionError);
                continue;
            }

            newImages.push({ file, url: URL.createObjectURL(file) });
        }

        setImages(newImages);
    };

    return (
        <div className="space-y-2">
            {/* Label */}
            <div className="flex items-center gap-2">
                <span className="text-blue-600 text-sm font-semibold">ⓘ</span>
                <span className="text-blue-600 text-sm">Hình ảnh hợp lệ</span>
            </div>

            {/* Error */}
            {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            {/* Upload Grid */}
            <div className="grid grid-cols-2 gap-5">

                {/* Add image button */}
                {images.length < 8 && (
                    <div
                        className="relative z-10 border-2 border-dashed border-orange-400 
             w-28 h-28 rounded bg-white flex justify-center items-center 
             cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <span className="text-orange-500 text-3xl font-bold">+</span>
                    </div>

                )}

                {/* Preview each image */}
                {images.map((img, index) => (
                    <div key={index} className="relative w-28 h-28">
                        <img
                            src={img.url}
                            className="w-full h-full object-cover rounded border"
                        />

                        {/* Remove */}
                        <button
                            className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
                            onClick={() => {
                                const newList = images.filter((_, i) => i !== index);
                                setImages(newList);
                            }}
                        >
                            ✕
                        </button>

                        {/* Hình bìa */}
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-t">
                                Hình bìa
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Hidden input file */}
            <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
            />
        </div>
    );
}
