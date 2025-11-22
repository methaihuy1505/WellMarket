import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { LoginModal } from "./Login";
import bcrypt from "bcryptjs";
import axios from "axios";

function checkPasswordConditions(password) {
  return {
    length: password.length >= 8 && password.length <= 30,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

// ==========================================
// Nội dung modal đăng ký
// ==========================================
function RegisterModalContent({ onClose }) {
  const [phone, setPhone] = useState("");
  const [error, setPhoneError] = useState("");

  const [pswd, setPassword] = useState("");
  const [errorPwd, setErrorPwd] = useState("");

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [confirmPswd, setConfirmPswd] = useState("");
  const [errorConfPass, setErrorConfPass] = useState("");

  const [agree, setAgree] = useState(false);
  const [errorAgree, setErrorAgree] = useState("");

  const conditions = checkPasswordConditions(pswd);
  const [showConditions, setShowConditions] = useState(false);

  const validatePhone = (value) => {
    const regex = /^0\d{9}$/;
    if (!value) return "Vui lòng nhập số điện thoại";
    if (!regex.test(value))
      return "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0";
    return "";
  };

  const handleSubmit = () => {
    let valid = true;

    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    } else {
      setPhoneError("");
    }

    if (!name) {
      setErrorName("Vui lòng nhập họ và tên");
      return;
    } else {
      setErrorName("");
    }
    const pwdErr = checkPasswordConditions(pswd);
    if (Object.values(pwdErr).some((v) => v === false)) {
      setErrorPwd("Mật khẩu ko hơp lê");
      return;
    } else {
      setErrorPwd("");
    }
    console.log(pwdErr);
    if (confirmPswd !== pswd) {
      setErrorConfPass("Mật khẩu nhập lại không khớp");
      return;
    } else {
      setErrorConfPass("");
    }

    if (!agree) {
      setErrorAgree("Bạn phải đồng ý với Điều Khoản Sử Dụng");
      return;
    } else {
      setErrorAgree("");
    }

    // Nếu tất cả hợp lệ

    const hashedpswd = bcrypt.hashSync(pswd, 5);
    console.log("Thông tin đăng ký:", phone, name, hashedpswd);
    const data = {
      Phone: phone,
      Name: name,
      Passord: hashedpswd,
    };
    console.log(data);
    axios
      .post("http://localhost:8000/login", data)
      .then((res) => {
        console.log("Server trả về:", res.data);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
      });

    alert("Đăng ký thành công!");
    onClose();
    LoginModal.show();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
              error
                ? "border-red-500 focus:ring-red-300 "
                : " focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
              errorName
                ? "border-red-500 focus:ring-red-300 "
                : " focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
            }`}
          />
          {errorName && (
            <p className="text-red-500 text-sm mb-3 text-center">{errorName}</p>
          )}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={pswd}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                setShowConditions(true), setErrorPwd("");
              }}
              onBlur={() => setShowConditions(false)}
              className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
                errorPwd
                  ? "border-red-500 focus:ring-red-300 "
                  : " focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
              }`}
            />
            {errorPwd && (
              <p className="text-red-500 text-sm mb-3 text-center">
                {errorPwd}
              </p>
            )}
            {showConditions && (
              <ul className="mt-2 text-sm">
                <li
                  className={
                    conditions.length ? "text-green-600" : "text-red-600"
                  }
                >
                  {conditions.length ? "✅" : "❌"} Độ dài từ 8–30 ký tự
                </li>
                <li
                  className={
                    conditions.uppercase ? "text-green-600" : "text-red-600"
                  }
                >
                  {conditions.uppercase ? "✅" : "❌"} Có ít nhất một chữ hoa
                  (A–Z)
                </li>
                <li
                  className={
                    conditions.lowercase ? "text-green-600" : "text-red-600"
                  }
                >
                  {conditions.lowercase ? "✅" : "❌"} Có ít nhất một chữ thường
                  (a–z)
                </li>
                <li
                  className={
                    conditions.number ? "text-green-600" : "text-red-600"
                  }
                >
                  {conditions.number ? "✅" : "❌"} Có ít nhất một chữ số (0–9)
                </li>
                <li
                  className={
                    conditions.special ? "text-green-600" : "text-red-600"
                  }
                >
                  {conditions.special ? "✅" : "❌"} Có ít nhất một ký tự đặc
                  biệt (!@#$%^&*…)
                </li>
              </ul>
            )}
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={confirmPswd}
            onChange={(e) => setConfirmPswd(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
              errorConfPass
                ? "border-red-500 focus:ring-red-300 "
                : " focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
            }`}
          />
          {errorConfPass && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {errorConfPass}
            </p>
          )}
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.value)}
              className="mr-2 accent-pink-500"
            />
            Tôi đồng ý với{" "}
            <a href="#" className="text-pink-600 ml-1 hover:underline">
              Điều Khoản Sử Dụng
            </a>
          </label>
          {errorAgree && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {errorAgree}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white rounded-lg py-2 font-medium hover:bg-pink-600 mt-2"
          >
            Đăng ký
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute font-semibold top-3 right-3 text-gray-500 hover:text-black hover:font-extrabold "
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
