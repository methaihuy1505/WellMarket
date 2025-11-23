import { useState } from "react";
import axios from "axios";

export default function TabSetting() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const handleSubmit = () => {
    const token = localStorage.getItem("userToken");
    axios.put("http://localhost:8000/api/profile/update-password", form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => alert(res.data.message))
    .catch(err => {
      console.error(err);
      alert("Có lỗi xảy ra khi đổi mật khẩu");
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Đổi mật khẩu</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={form.current_password}
          onChange={e => setForm({...form, current_password: e.target.value})}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={form.new_password}
          onChange={e => setForm({...form, new_password: e.target.value})}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={form.new_password_confirmation}
          onChange={e => setForm({...form, new_password_confirmation: e.target.value})}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}