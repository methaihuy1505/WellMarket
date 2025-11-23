// src/components/Admin/PostsManager.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * PostsManager
 * - Tabs: posts | reports | blocked
 * - API endpoints expected:
 *   GET  /api/posts
 *   GET  /api/posts/:id
 *   POST /api/posts        (create)
 *   PUT  /api/posts/:id    (update)
 *   DELETE /api/posts/:id  (delete)
 *   GET  /api/reports
 *   POST /api/posts/:id/block
 *   POST /api/posts/:id/unblock
 *   GET  /api/blocked-posts
 *
 * NOTE: If your backend uses different endpoints/names adjust accordingly.
 *
 * Placeholder image (from your uploaded file):
 * /mnt/data/b04f380b-5a15-4516-86a1-71e3a5951e90.png
 */

const PLACEHOLDER_IMG = "/mnt/data/b04f380b-5a15-4516-86a1-71e3a5951e90.png";

const safeArr = (a) => (Array.isArray(a) ? a : []);
const fmtDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

export default function PostsManager() {
  const [tab, setTab] = useState("posts"); // posts | reports | blocked

  const [posts, setPosts] = useState([]);
  const [reports, setReports] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // general message

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view | edit | create
  const [current, setCurrent] = useState(null); // current post object (editable)
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLists();
    setTimeout(() => searchRef.current?.focus(), 150);
  }, []);

  // fetch lists from backend
  const fetchLists = async () => {
    setLoading(true);
    setMsg("");
    try {
      const [pRes, rRes, bRes] = await Promise.all([
        axios.get("/api/posts"),
        axios.get("/api/reports"),
        axios.get("/api/blocked-posts"),
      ]);

      const pData = Array.isArray(pRes.data)
        ? pRes.data
        : pRes.data?.data ?? [];
      const rData = Array.isArray(rRes.data)
        ? rRes.data
        : rRes.data?.data ?? [];
      const bData = Array.isArray(bRes.data)
        ? bRes.data
        : bRes.data?.data ?? [];

      setPosts(pData);
      setReports(rData);
      setBlocked(bData);
    } catch (err) {
      console.warn("fetchLists failed", err);
      setMsg(
        "Không thể tải dữ liệu từ API — kiểm tra backend (hiện để bảng rỗng)."
      );
      // leave arrays empty so UI shows nothing
    } finally {
      setLoading(false);
    }
  };

  // filtered posts for search
  const filteredPosts = safeArr(posts).filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(p.id).toLowerCase().includes(q) ||
      String(p.title ?? "")
        .toLowerCase()
        .includes(q) ||
      String(p.category ?? "")
        .toLowerCase()
        .includes(q)
    );
  });

  // VIEW details: get detail from API then open modal (fallback to local)
  const viewDetails = async (id) => {
    setModalMode("view");
    setModalOpen(true);
    setCurrent(null);
    setLoadingDetail(true);
    try {
      const res = await axios.get(`/api/posts/${id}`);
      const payload = res?.data?.data ?? res?.data ?? null;
      setCurrent(payload ?? {});
    } catch (err) {
      console.warn("GET post detail failed - falling back to local", err);
      setMsg("Không lấy được chi tiết từ API — hiển thị dữ liệu cục bộ.");
      const local =
        safeArr(posts).find((x) => String(x.id) === String(id)) ?? null;
      setCurrent(local);
    } finally {
      setLoadingDetail(false);
    }
  };

  // OPEN edit modal (GET detail then allow edit)
  const openEdit = async (id) => {
    setModalMode("edit");
    setModalOpen(true);
    setCurrent(null);
    setLoadingDetail(true);
    try {
      const res = await axios.get(`/api/posts/${id}`);
      const payload = res?.data?.data ?? res?.data ?? {};
      // ensure fields exist
      setCurrent({
        id: payload.id,
        title: payload.title ?? "",
        category: payload.category ?? "",
        price: payload.price ?? 0,
        description: payload.description ?? "",
        images: payload.images ?? [],
        postedBy: payload.postedBy ?? null,
        createdAt:
          payload.createdAt ?? payload.created_at ?? payload.date ?? null,
        status: payload.status ?? "active",
        reportReason: payload.reportReason ?? null,
      });
    } catch (err) {
      console.warn("GET post for edit failed - using local", err);
      setMsg("Không lấy được chi tiết từ API — chỉnh sửa cục bộ.");
      const local =
        safeArr(posts).find((x) => String(x.id) === String(id)) ?? null;
      if (local) {
        setCurrent({
          ...local,
          title: local.title ?? "",
          category: local.category ?? "",
          price: local.price ?? 0,
          description: local.description ?? "",
          images: local.images ?? [],
          postedBy: local.postedBy ?? null,
          createdAt: local.createdAt ?? local.date ?? null,
          status: local.status ?? "active",
        });
      } else {
        setCurrent(null);
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  // OPEN create modal (empty fields), validate date only allows today or future
  const openCreate = () => {
    setModalMode("create");
    setModalOpen(true);
    setCurrent({
      title: "",
      category: "",
      price: 0,
      description: "",
      images: [],
      postedBy: null,
      createdAt: new Date().toISOString(),
      status: "active",
    });
  };

  // SAVE create or edit
  const save = async () => {
    if (!current) return;
    if (!current.title?.trim()) return alert("Tiêu đề không được rỗng.");
    if (!current.category?.trim()) return alert("Danh mục không được rỗng.");
    // createdAt must be today or future when creating — user requested that
    if (modalMode === "create") {
      const created = new Date(current.createdAt);
      const now = new Date();
      // zero time-of-day for comparison of date-only requirement? user wanted choose day >= today
      const createdDate = new Date(
        created.getFullYear(),
        created.getMonth(),
        created.getDate()
      );
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (createdDate < today)
        return alert("Ngày đăng chỉ được chọn ngày hiện tại hoặc tương lai.");
    }

    setSaving(true);
    try {
      if (modalMode === "create") {
        // POST
        const payload = {
          title: current.title,
          category: current.category,
          price: current.price,
          description: current.description,
          createdAt: current.createdAt,
        };
        const res = await axios.post("/api/posts", payload);
        const created = res?.data?.data ?? res?.data ?? payload;
        // ensure we have id even if backend doesn't return — frontend-only id fallback
        const newPost = { ...created, id: created.id ?? Date.now() };
        setPosts((p) => [newPost, ...p]);
      } else {
        // PUT
        const payload = {
          title: current.title,
          category: current.category,
          price: current.price,
          description: current.description,
        };
        await axios.put(`/api/posts/${current.id}`, payload);
        setPosts((p) =>
          p.map((x) =>
            String(x.id) === String(current.id) ? { ...x, ...payload } : x
          )
        );
      }
      setModalOpen(false);
      setCurrent(null);
    } catch (err) {
      console.warn("save failed - applying local change", err);
      // local fallback
      if (modalMode === "create") {
        const newPost = { ...current, id: Date.now() };
        setPosts((p) => [newPost, ...p]);
      } else {
        setPosts((p) =>
          p.map((x) =>
            String(x.id) === String(current.id) ? { ...x, ...current } : x
          )
        );
      }
      setModalOpen(false);
      setCurrent(null);
    } finally {
      setSaving(false);
    }
  };

  // DELETE post
  const remove = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài đăng này?")) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts((p) => p.filter((x) => String(x.id) !== String(id)));
      // also remove from reports/blocked if present
      setReports((r) => r.filter((rep) => String(rep.postId) !== String(id)));
      setBlocked((b) => b.filter((bk) => String(bk.id) !== String(id)));
    } catch (err) {
      console.warn("delete failed - removing locally", err);
      setPosts((p) => p.filter((x) => String(x.id) !== String(id)));
      setReports((r) => r.filter((rep) => String(rep.postId) !== String(id)));
      setBlocked((b) => b.filter((bk) => String(bk.id) !== String(id)));
    }
  };

  // BLOCK post (move from reports->blocked)
  const blockPost = async (id, reason = "Bị báo cáo") => {
    if (!window.confirm("Chặn bài đăng này?")) return;
    try {
      await axios.post(`/api/posts/${id}/block`, { reason });
      // remove from posts and add to blocked list (backend likely manages this, but we update locally)
      const toBlock = posts.find((p) => String(p.id) === String(id));
      setPosts((p) => p.filter((x) => String(x.id) !== String(id)));
      const bItem = toBlock
        ? {
            ...toBlock,
            blockedAt: new Date().toISOString(),
            blockReason: reason,
          }
        : { id, blockedAt: new Date().toISOString(), blockReason: reason };
      setBlocked((b) => [bItem, ...b]);
    } catch (err) {
      console.warn("block failed - updating locally", err);
      const toBlock = posts.find((p) => String(p.id) === String(id));
      setPosts((p) => p.filter((x) => String(x.id) !== String(id)));
      const bItem = toBlock
        ? {
            ...toBlock,
            blockedAt: new Date().toISOString(),
            blockReason: reason,
          }
        : { id, blockedAt: new Date().toISOString(), blockReason: reason };
      setBlocked((b) => [bItem, ...b]);
    }
  };

  // UNBLOCK post
  const unblockPost = async (id) => {
    if (!window.confirm("Hủy chặn bài đăng này?")) return;
    try {
      await axios.post(`/api/posts/${id}/unblock`);
      setBlocked((b) => b.filter((x) => String(x.id) !== String(id)));
      // optionally re-add to posts? depends on backend; here we won't automatically re-add
    } catch (err) {
      console.warn("unblock failed - updating locally", err);
      setBlocked((b) => b.filter((x) => String(x.id) !== String(id)));
    }
  };

  // handle report actions: delete+block
  const handleReportBlock = async (report) => {
    if (!report?.postId) return alert("Không có postId trong báo cáo.");
    await blockPost(report.postId, report.reason ?? "Bị báo cáo");
    // remove the report entry locally
    setReports((r) => r.filter((x) => x.id !== report.id));
  };

  // filtering UI: simple (category / date range)
  const [filterCategory, setFilterCategory] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const applyFilters = (list) => {
    return safeArr(list).filter((p) => {
      if (
        filterCategory &&
        String(p.category ?? "").toLowerCase() !== filterCategory.toLowerCase()
      )
        return false;
      if (filterFrom) {
        const fromDate = new Date(filterFrom);
        const created = new Date(
          p.createdAt ?? p.created_at ?? p.date ?? p.created ?? null
        );
        if (isNaN(created.getTime()) || created < fromDate) return false;
      }
      if (filterTo) {
        const toDate = new Date(filterTo);
        const created = new Date(
          p.createdAt ?? p.created_at ?? p.date ?? p.created ?? null
        );
        if (isNaN(created.getTime()) || created > toDate) return false;
      }
      return true;
    });
  };

  const visiblePosts = applyFilters(filteredPosts);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Bài đăng</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/up-post")}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Tạo bài đăng
          </button>
          <div className="text-sm text-gray-500">
            {loading ? "Đang tải..." : `${safeArr(posts).length} bài đăng`}
          </div>
        </div>
      </div>

      {msg && <div className="text-yellow-600 mb-3">{msg}</div>}

      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div>
          <input
            ref={searchRef}
            className="border px-3 py-2 rounded w-64"
            placeholder="Tìm theo tiêu đề, danh mục, id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Lọc danh mục"
            className="border px-2 py-1 rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <label className="text-sm text-gray-500">Từ</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
          />
          <label className="text-sm text-gray-500">Đến</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
          />
          <button
            className="px-2 py-1 border rounded"
            onClick={() => {
              setFilterCategory("");
              setFilterFrom("");
              setFilterTo("");
            }}
          >
            Reset filter
          </button>
        </div>
      </div>

      <div className="flex gap-6 border-b pb-2 mb-4">
        <button
          className={tab === "posts" ? "font-semibold" : "text-gray-500"}
          onClick={() => setTab("posts")}
        >
          Bài đăng
        </button>
        <button
          className={tab === "reports" ? "font-semibold" : "text-gray-500"}
          onClick={() => setTab("reports")}
        >
          Báo cáo
        </button>
        <button
          className={tab === "blocked" ? "font-semibold" : "text-gray-500"}
          onClick={() => setTab("blocked")}
        >
          Bị chặn
        </button>
      </div>

      {tab === "posts" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="py-2 w-14">#</th>
                <th className="py-2">Tên bài</th>
                <th className="py-2">Danh mục</th>
                <th className="py-2">Giá</th>
                <th className="py-2">Ngày đăng</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {visiblePosts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{p.id}</td>
                  <td className="py-2">{p.title}</td>
                  <td className="py-2">{p.category ?? "-"}</td>
                  <td className="py-2">{p.price ?? "-"}</td>
                  <td className="py-2">
                    {fmtDate(p.createdAt ?? p.date ?? p.created)}
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => viewDetails(p.id)}
                    >
                      Chi tiết
                    </button>
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => openEdit(p.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 border text-red-600 rounded text-sm"
                      onClick={() => remove(p.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {visiblePosts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    Không tìm thấy bài đăng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reports" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="py-2 w-14">#</th>
                <th className="py-2">Tên bài</th>
                <th className="py-2">Người báo</th>
                <th className="py-2">Lý do</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {safeArr(reports).map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.id}</td>
                  <td className="py-2">{r.postTitle ?? r.title ?? "-"}</td>
                  <td className="py-2">
                    {r.reporterName ?? r.reporter ?? "-"}
                  </td>
                  <td className="py-2">{r.reason ?? "-"}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() =>
                        viewDetails(r.postId ?? r.post?.id ?? r.id)
                      }
                    >
                      Chi tiết
                    </button>
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => handleReportBlock(r)}
                    >
                      Chặn
                    </button>
                    <button
                      className="px-3 py-1 border text-red-600 rounded text-sm"
                      onClick={() => {
                        if (window.confirm("Xóa báo cáo này?"))
                          setReports((old) => old.filter((x) => x.id !== r.id));
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {safeArr(reports).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Không có báo cáo
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "blocked" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="py-2 w-14">#</th>
                <th className="py-2">Tên bài</th>
                <th className="py-2">Lý do</th>
                <th className="py-2">Thời gian chặn</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {safeArr(blocked).map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="py-2">{b.id}</td>
                  <td className="py-2">{b.title ?? b.name ?? "-"}</td>
                  <td className="py-2">{b.blockReason ?? b.reason ?? "-"}</td>
                  <td className="py-2">
                    {fmtDate(b.blockedAt ?? b.blocked_at)}
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => viewDetails(b.id)}
                    >
                      Chi tiết
                    </button>
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => unblockPost(b.id)}
                    >
                      Hủy chặn
                    </button>
                  </td>
                </tr>
              ))}
              {safeArr(blocked).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Không có bài bị chặn
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal detail / edit / create */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded p-6 shadow-lg overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalMode === "view"
                  ? "Chi tiết bài đăng"
                  : modalMode === "edit"
                  ? "Sửa bài đăng"
                  : "Tạo bài đăng"}
              </h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCurrent(null);
                }}
              >
                {/* close */}✕
              </button>
            </div>

            {loadingDetail ? (
              <div className="py-8 text-center text-gray-500">Đang tải...</div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-48 h-48 border rounded overflow-hidden bg-gray-50">
                    <img
                      src={
                        current?.images?.[0] ??
                        current?.image ??
                        PLACEHOLDER_IMG
                      }
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="col-span-8">
                  {!current ? (
                    <div>Không có dữ liệu</div>
                  ) : modalMode === "view" ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Tiêu đề</p>
                        <p className="font-medium text-lg">
                          {current.title ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Danh mục</p>
                        <p className="font-medium">{current.category ?? "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Giá</p>
                        <p className="font-medium">{current.price ?? "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Ngày đăng</p>
                        <p className="font-medium">
                          {fmtDate(
                            current.createdAt ?? current.date ?? current.created
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Mô tả</p>
                        <div className="mt-2 border rounded p-3 bg-gray-50">
                          {current.description ?? "-"}
                        </div>
                      </div>

                      {current.postedBy && (
                        <div>
                          <p className="text-sm text-gray-500">Người đăng</p>
                          <p className="font-medium">
                            {current.postedBy.name ?? "-"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {current.postedBy.email ?? "-"}
                          </p>
                        </div>
                      )}

                      {/* reports reason if present */}
                      {current.reportReason && (
                        <div>
                          <p className="text-sm text-gray-500">Lý do báo cáo</p>
                          <div className="mt-2 border rounded p-2 bg-yellow-50">
                            {current.reportReason}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex justify-end gap-3">
                        <button
                          className="px-3 py-2 border rounded"
                          onClick={() => {
                            setModalOpen(false);
                            setCurrent(null);
                          }}
                        >
                          Đóng
                        </button>
                        <button
                          className="px-3 py-2 bg-blue-600 text-white rounded"
                          onClick={() => openEdit(current.id)}
                        >
                          Sửa
                        </button>
                      </div>
                    </div>
                  ) : (
                    // edit/create form
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">Tiêu đề</label>
                        <input
                          className="w-full border px-3 py-2 rounded"
                          value={current.title ?? ""}
                          onChange={(e) =>
                            setCurrent((p) => ({ ...p, title: e.target.value }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Danh mục</label>
                        <input
                          className="w-full border px-3 py-2 rounded"
                          value={current.category ?? ""}
                          onChange={(e) =>
                            setCurrent((p) => ({
                              ...p,
                              category: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Giá</label>
                        <input
                          type="number"
                          className="w-full border px-3 py-2 rounded"
                          value={current.price ?? 0}
                          onChange={(e) =>
                            setCurrent((p) => ({
                              ...p,
                              price: Number(e.target.value),
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Mô tả</label>
                        <textarea
                          className="w-full border px-3 py-2 rounded"
                          rows={5}
                          value={current.description ?? ""}
                          onChange={(e) =>
                            setCurrent((p) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Ngày đăng</label>
                        <input
                          type="date"
                          className="w-full border px-3 py-2 rounded"
                          value={
                            current.createdAt
                              ? new Date(current.createdAt)
                                  .toISOString()
                                  .slice(0, 10)
                              : ""
                          }
                          onChange={(e) => {
                            const d = e.target.value;
                            const iso = new Date(d + "T00:00:00").toISOString();
                            setCurrent((p) => ({ ...p, createdAt: iso }));
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Chỉ cho chọn ngày hiện tại hoặc tương lai khi tạo.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          className="px-3 py-2 border rounded"
                          onClick={() => {
                            setModalOpen(false);
                            setCurrent(null);
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded"
                          onClick={save}
                          disabled={saving}
                        >
                          {saving ? "Đang lưu..." : "Lưu"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
