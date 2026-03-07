export default function PaymentModal({
  open,
  onCancel,
  onComplete,
  amount,
  breakdown,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fadeIn">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Thanh toán cần thiết
        </h3>
        <p className="mb-6 text-gray-600">
          Bạn cần thanh toán{" "}
          <span className="font-semibold text-red-600">{amount}đ</span> để đăng
          bài này.
          <br />
          <span className="text-sm text-gray-500">
            Chi tiết: phí cơ bản (tính từ bài thứ 3 trở lên) = {breakdown?.base}
            đ, phí thêm (nếu có 1 video và 3 ảnh trở lên) = {breakdown?.extra}đ
          </span>
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={onComplete}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
