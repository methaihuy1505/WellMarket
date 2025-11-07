import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// ==========================================
// Nội dung modal đăng ký
// ==========================================
function RegisterModalContent({ onClose }) {
  const [form, setForm] = useState({
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.agree) {
      alert("Vui lòng đồng ý với Điều Khoản Sử Dụng!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    console.log("Thông tin đăng ký:", form);
    alert("Đăng ký thành công!");
    onClose();
  };

  // ✅ Đóng popup khi click ra ngoài
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl shadow-md w-[400px] p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg font-semibold mb-4">
          Đăng ký tài khoản
        </h2>

        <div className="space-y-3">
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />

          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mr-2 accent-pink-500"
            />
            Tôi đồng ý với{" "}
            <a href="#" className="text-pink-600 ml-1 hover:underline">
              Điều Khoản Sử Dụng
            </a>
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white rounded-lg py-2 font-medium hover:bg-pink-600 mt-2"
          >
            Đăng ký
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ==========================================
// Static API: RegisterModal.show()
// ==========================================
export const RegisterModal = {
  show() {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = ReactDOM.createRoot(modalRoot);

    const close = () => {
      root.unmount();
      document.body.removeChild(modalRoot);
    };

    root.render(<RegisterModalContent onClose={close} />);
  },
};
