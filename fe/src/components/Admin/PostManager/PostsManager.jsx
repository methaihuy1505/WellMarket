import React, { useEffect, useRef, useState } from "react";
import api from "../../../utils/api";
import PostsTabs from "./PostsTabs";
import PostsTable from "./PostsTable";
import ReportsTable from "./ReportsTable";
import PendingPostsTable from "./PendingPostsTable"; // Component mới
import PostModal from "./PostModal";
import { safeArr } from "../../../utils/utils";

export default function PostsManager() {
  const [tab, setTab] = useState("posts");

  const [posts, setPosts] = useState([]);
  const [reports, setReports] = useState([]);
  const [pending, setPending] = useState([]); // State cho bài chờ duyệt

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [current, setCurrent] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMsg("");
      try {
        const [postsRes, reportsRes, pendingRes] = await Promise.all([
          api.get("/admin/posts"),         // Bài đăng (Active/Rejected)
          api.get("/reports/posts"),       // Báo cáo
          api.get("/admin/posts/pending"), // Chờ duyệt
        ]);

        setPosts(safeArr(postsRes.data?.data));
        setReports(safeArr(reportsRes.data?.data));
        setPending(safeArr(pendingRes.data?.data));
      } catch (err) {
        console.error("Fetch posts failed", err);
        setMsg("Lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filterList = (list) => {
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      (item) =>
        String(item.id).includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q)
    );
  };

  /* ================= ACTIONS ================= */
  
  // 1. Duyệt hoặc Từ chối (ở tab Pending)
  const handleReview = async (id, status) => {
    // status: 'active' (Duyệt) hoặc 'rejected' (Từ chối)
    const actionText = status === 'active' ? "DUYỆT" : "TỪ CHỐI";
    if (!window.confirm(`Bạn muốn ${actionText} bài đăng này?`)) return;

    try {
      const res = await api.post(`/admin/posts/${id}/status`, { status });
      const updatedPost = { ...pending.find(p => p.id === id), status: status };

      // Xóa khỏi danh sách Pending
      setPending(prev => prev.filter(p => p.id !== id));

      // Thêm vào danh sách Posts chính
      // (Lưu ý: API updateStatus trả về data mới, nên dùng data đó để chuẩn hơn)
      setPosts(prev => [updatedPost, ...prev]);

      alert(`Đã ${actionText.toLowerCase()} bài đăng.`);
    } catch (err) {
      alert("Thao tác thất bại.");
    }
  };

  // 2. Đảo trạng thái (Active <-> Rejected) ở tab Posts
  const toggleStatus = async (id) => {
    const post = posts.find(p => p.id === id);
    const isRejected = post?.status === 'rejected';
    const actionText = isRejected ? "DUYỆT LẠI (Active)" : "TỪ CHỐI (Reject)";

    if (!window.confirm(`Bạn muốn chuyển sang trạng thái ${actionText}?`)) return;

    try {
      const res = await api.post(`/admin/posts/${id}/status`); // Không gửi status -> Tự toggle
      const newStatus = res.data?.data?.status;

      setPosts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái.");
    }
  };

  // 3. Xóa bài
  const remove = async (id) => {
    if (!window.confirm("Xóa vĩnh viễn bài đăng này?")) return;
    try {
      await api.delete(`/admin/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
      setPending(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  // View & Edit Modal logic (Giữ nguyên hoặc tối giản)
  const viewDetails = async (id) => {
     setModalOpen(true); setModalMode("view"); setLoadingDetail(true);
     try {
        const res = await api.get(`/posts/${id}`); // Dùng API public để xem chi tiết
        setCurrent(res.data);
     } catch (e) { setCurrent(posts.find(p => p.id === id) || {}); }
     finally { setLoadingDetail(false); }
  };

  const openEdit = async (id) => {
     setModalOpen(true); setModalMode("edit"); setLoadingDetail(true);
     try {
        const res = await api.get(`/posts/${id}`);
        setCurrent(res.data);
     } catch (e) { setCurrent(posts.find(p => p.id === id) || {}); }
     finally { setLoadingDetail(false); }
  };

  const save = async () => {
     // Logic lưu khi sửa (gọi API admin update)
     // ... (giữ nguyên code save cũ của bạn)
     setSaving(true);
     try {
        await api.put(`/admin/posts/${current.id}`, current);
        // Reload list hoặc update local
        window.location.reload(); // Cách đơn giản nhất để refresh data
     } catch(e) { alert("Lỗi"); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Bài đăng</h2>
      </div>
      {msg && <p className="text-yellow-600 mb-3">{msg}</p>}

      <div className="mb-3">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm..."
          className="border px-3 py-2 rounded w-72"
        />
      </div>

      <PostsTabs tab={tab} setTab={setTab} />

      {tab === "posts" && (
        <PostsTable
          posts={filterList(posts)}
          onView={viewDetails}
          onEdit={openEdit}
          onToggleStatus={toggleStatus} // Nút toggle Active/Rejected
          onDelete={remove}
        />
      )}

      {tab === "pending" && (
        <PendingPostsTable
          posts={filterList(pending)}
          onView={viewDetails}
          onApprove={(id) => handleReview(id, 'active')}
          onReject={(id) => handleReview(id, 'rejected')}
        />
      )}

      {tab === "reports" && (
        <ReportsTable
          reports={filterList(reports)}
          onView={(id) => viewDetails(id)}
          // Nút xử lý report có thể là Reject bài đó
          onBlock={(report) => handleReview(report.postId, 'rejected')} 
        />
      )}

      <PostModal
        open={modalOpen} mode={modalMode} loading={loadingDetail} saving={saving} post={current}
        onClose={() => setModalOpen(false)} onSave={save}
        onChange={(f, v) => setCurrent(prev => ({...prev, [f]: v}))}
      />
    </div>
  );
}