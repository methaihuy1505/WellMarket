import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [pswd, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPwd, setErrorPwd] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Vui lòng nhập email";
    if (!regex.test(value)) return "Email không hợp lệ";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errEmail = validateEmail(email);
    if (errEmail) {
      setErrorEmail(errEmail);
      return;
    } else {
      setErrorEmail("");
    }

    if (!pswd) {
      setErrorPwd("Vui lòng nhập mật khẩu");
      return;
    } else {
      setErrorPwd("");
    }

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: pswd,
      });
      console.log("Server trả về:", res.data);
        // lưu token đúng key
        if (res.data?.access_token) {
          localStorage.setItem("adminToken", res.data.access_token);
        }
        // chuyển hướng về trang chủ
        if (res.data.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/";
        }
      navigate("/admin-dashboard");
    } catch (err) {
      setServerMsg(
        "Đăng nhập thất bại: " + err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-[400px]"
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          WellMarket - Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border rounded-lg p-2 mb-2 ${
            errorEmail ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errorEmail && (
          <p className="text-red-500 text-sm mb-2">{errorEmail}</p>
        )}

        <input
          type="password"
          placeholder="Mật khẩu"
          value={pswd}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full border rounded-lg p-2 mb-2 ${
            errorPwd ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errorPwd && <p className="text-red-500 text-sm mb-2">{errorPwd}</p>}

        <button
          type="submit"
          className="w-full bg-pink-400 text-white rounded-lg py-2 font-medium hover:bg-pink-500"
        >
          Đăng nhập
        </button>

        {serverMsg && (
          <p className="text-center text-sm mt-4 text-gray-700">{serverMsg}</p>
        )}
      </form>
    </div>
  );
}
