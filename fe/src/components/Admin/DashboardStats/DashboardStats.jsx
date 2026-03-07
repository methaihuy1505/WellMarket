import React, { useEffect, useState } from "react";
import api from "../../../utils/api";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    users: { total: 0, new: 0 },
    posts: { total: 0, pending: 0 },
    reports: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        if (res.data && res.data.data) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu thống kê:", err);
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Đang tải thống kê...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Tổng quan hệ thống</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Doanh thu */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-md text-white">
          <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Tổng Doanh Thu</div>
          <div className="text-3xl font-bold mt-2">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(stats.revenue)}
          </div>
        </div>

        {/* Người dùng */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Tài khoản User</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{stats.users.total}</div>
          <div className="text-sm text-green-600 mt-2 font-medium">
            + {stats.users.new} người dùng mới (7 ngày qua)
          </div>
        </div>

        {/* Bài đăng */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Tổng Bài Đăng</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{stats.posts.total}</div>
          <div className="text-sm text-orange-500 mt-2 font-medium">
            ⏳ {stats.posts.pending} bài đang chờ duyệt
          </div>
        </div>

        {/* Báo cáo */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Tổng Báo Cáo</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{stats.reports}</div>
          <div className="text-sm text-gray-400 mt-2">
            Các báo cáo cần xử lý
          </div>
        </div>
      </div>
    </div>
  );
}