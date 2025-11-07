import React, { useState } from "react";
import { createRoot } from "react-dom/client"; // <<< quan trọng: dùng named import createRoot
import { RegisterModal } from "./Register";
function LoginModalContent({ onClose }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");


   const handleRegisterClick = () => {
    onClose(); // đóng modal login
    setTimeout(() => {
      RegisterModal.show(); // mở modal đăng ký
    }, 200);
  };


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validatePhone = (value) => {
    const regex = /^0\d{9}$/;
    if (!value) return "Vui lòng nhập số điện thoại";
    if (!regex.test(value)) return "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0";
    return "";
  };

  const handleSubmit = () => {
    const err = validatePhone(phone);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const result = { success: true, phone };
    console.log("Login submit ->", result);
    // nếu cần gọi API ở đây thì gọi rồi onClose() sau khi có kết quả
    onClose(); // đóng modal
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl shadow-md w-[380px] p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg font-semibold mb-4">Đăng nhập WellCoin</h2>

        <button className="w-full text-gray-600 flex items-center justify-center border rounded-full py-2 hover:text-black hover:bg-pink-200 mb-2">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google" />
          Tiếp tục với Google
        </button>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Hoặc</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <input
          type="tel"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`w-full border rounded-lg p-2 focus:ring-2 mb-1 ${
            error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-pink-200"
          }`}
        />
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <button onClick={handleSubmit} className="w-full bg-pink-500 text-white rounded-lg py-2 font-medium hover:bg-pink-600">
          Tiếp tục
        </button>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">
            Chưa có tài khoản?
            <a href="#" className="hover:underline hover:text-pink-700 ml-2" onClick={handleRegisterClick}>Đăng ký</a>
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-center text-xs text-gray-500 space-x-3 mt-4 flex justify-center">
          <a href="#" className="hover:underline hover:text-pink-700">Quy chế hoạt động sàn</a>
          <a href="#" className="hover:underline hover:text-pink-700">Chính sách bảo mật</a>
          <a href="#" className="hover:underline hover:text-pink-700">Liên hệ hỗ trợ</a>
        </div>
      </div>
    </div>
  );
}

/** Static API */
export const LoginModal = {
  show() {
    console.log("LoginModal.show() called"); // debug: kiểm tra xem hàm có được gọi
    const modalRoot = document.createElement("div");
    modalRoot.dataset.modal = "login";
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot); // <- dùng createRoot
    const close = () => {
      try {
        root.unmount();
      } catch (e) {
        /* ignore */
      }
      if (modalRoot.parentNode) modalRoot.parentNode.removeChild(modalRoot);
    };

    root.render(<LoginModalContent onClose={close} />);
  },
};
