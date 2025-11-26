import React, { useState, useRef } from "react";
import AccountManager from "../components/Admin/AccountManager";
import EventManager from "../components/Admin/EventManager";
import PostsManager from "../components/Admin/PostManager";

export default function AdminDashBoard() {
  const DEFAULT_AVATAR = "/mnt/data/c2f2bffd-755f-40cd-adf8-c4980e31d491.png";
  const AVATAR_SAMPLE = "/mnt/data/31b48e4b-3c90-458e-a48b-eda3567ca8f1.png";

  const [active, setActive] = useState("taikhoan"); // 'taikhoan' | 'sukien' | 'baidang' | 'thongke'
  const [editing, setEditing] = useState(false);
  const fileRef = useRef(null);

  // sample events/posts (kept for tabs)
  const [events] = useState([
    {
      id: 1,
      title: "Hội thảo CNTT",
      date: "2025-11-10",
      location: "Hội trường A",
    },
    {
      id: 2,
      title: "Workshop Java",
      date: "2025-12-01",
      location: "Phòng Lab 3",
    },
  ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Bán Laptop Dell XPS 13",
      price: "12,000,000",
      status: "Đã đăng",
    },
    { id: 2, title: "Cần mua tai nghe", price: "0", status: "Bản nháp" },
  ]);

  const handleCreatePost = () => {
    const id = Date.now();
    const newPost = {
      id,
      title: "Bài đăng mới",
      price: "0",
      status: "Bản nháp",
    };
    setPosts((p) => [newPost, ...p]);
  };

  const [loadingData, setLoadingData] = useState(false);
  const [dataErr, setDataErr] = useState("");

  // menu item component
  const MenuItem = ({ id, label, icon }) => (
    <li
      onClick={() => setActive(id)}
      className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
        active === id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </li>
  );

  const renderContent = () => {
    switch (active) {
      case "taikhoan":
        return <AccountManager />;

      case "sukien":
        return <EventManager />;

      case "baidang":
        return <PostsManager />;

      case "thongke":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-6">Thống kê</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-600">Số bài đăng</div>
                <div className="text-2xl font-bold mt-2">{posts.length}</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-600">Sự kiện đã tham gia</div>
                <div className="text-2xl font-bold mt-2">{events.length}</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-600">Lượt xem (demo)</div>
                <div className="text-2xl font-bold mt-2">1,234</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-black text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white"></div>
          <div className="font-semibold">ADMIN WELLMARKET</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">{"profile.fullName"}</div>
          <button className="bg-white text-black px-3 py-1 rounded">
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3">
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-3">Thanh Menu</h3>
              <ul className="space-y-2">
                <MenuItem id="taikhoan" label="Tài khoản" icon="" />
                <MenuItem id="sukien" label="Sự kiện" icon="" />
                <MenuItem id="baidang" label="Bài đăng" icon="" />
                <MenuItem id="thongke" label="Thống kê" icon="" />
              </ul>
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-9">
            <div className="bg-white rounded shadow p-6">{renderContent()}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
