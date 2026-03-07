import { useState } from "react";
import api from "../../utils/api";

export default function TabSetting() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate cơ bản
    if (!form.current_password || !form.new_password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (form.new_password !== form.new_password_confirmation) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put("/profile/update-password", form);
      alert(res.data.message);
      // Reset form
      setForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Bảo mật tài khoản</h2>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý mật khẩu và bảo mật đăng nhập
        </p>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.current_password}
            onChange={(e) =>
              setForm({ ...form, current_password: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mật khẩu mới
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.new_password}
            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.new_password_confirmation}
            onChange={(e) =>
              setForm({ ...form, new_password_confirmation: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-pink-700 transition-all active:scale-[0.98] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang xử lý...
              </span>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
