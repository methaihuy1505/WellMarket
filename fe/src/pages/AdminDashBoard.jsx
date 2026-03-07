import React, { useState, useRef, useEffect } from "react";
import AccountManager from "../components/Admin/AccountManager/AccountManager";
import EventManager from "../components/Admin/EventManager/EventManager";
import PostsManager from "../components/Admin/PostManager/PostsManager";
import DashboardStats from "../components/Admin/DashboardStats/DashboardStats";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
export default function AdminDashBoard() {
  const [active, setActive] = useState("taikhoan"); // 'taikhoan' | 'sukien' | 'baidang' | 'thongke'
  const [editing, setEditing] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataErr, setDataErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [eventsRes, postsRes, accountsRes, profileRes] =
          await Promise.all([
            api.get("/admin/events"),
            api.get("/admin/posts"),
            api.get("/accounts"),
            api.get("/profile"),
          ]);
        setEvents(eventsRes.data);
        setPosts(postsRes.data);
        setAccounts(accountsRes.data);
        setProfile(profileRes.data);
      } catch (err) {
        console.error(err);
        setDataErr("Không thể tải dữ liệu");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);
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
        return <AccountManager accounts={accounts} />;

      case "sukien":
        return <EventManager events={events} />;
      case "baidang":
        return <PostsManager posts={posts} />;

      case "thongke":
        return <DashboardStats />;
      default:
        return;
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
          <div className="hidden md:block">{profile?.fullName}</div>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin-login");
            }}
            className="bg-white text-black px-3 py-1 rounded"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3">
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-3">MENU QUẢN LÝ</h3>
              <ul className="space-y-2">
                <MenuItem id="taikhoan" label="Quản lý tài khoản" icon="" />
                <MenuItem id="sukien" label="Quản lý sự kiện" icon="" />
                <MenuItem id="baidang" label="Quản lý bài đăng" icon="" />
                <MenuItem id="thongke" label="Thống kê chung" icon="" />
              </ul>
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-9">
            {loadingData && <div>Đang tải dữ liệu...</div>}
            {dataErr && <div className="text-red-500">{dataErr}</div>}
            <div className="bg-white rounded shadow p-6">{renderContent()}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
