import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/**
 * AccountManager (API-only)
 * - Không còn MOCK_* data
 * - Khi mount: gọi API /api/accounts, /api/reports, /api/blocked
 * - Nếu API list fail => hiển thị mảng rỗng (không có mock)
 * - viewDetails/openEdit: cố gọi API chi tiết, nếu fail -> fallback dùng item từ danh sách hiện có (nếu có)
 *
 * Default avatar uses uploaded file path (local).
 * Update endpoints as needed.
 */

const safeArr = (a) => (Array.isArray(a) ? a : []);

const normalize = (o = {}) => ({
  id: o.id ?? null,
  name: o.name ?? o.fullName ?? o.username ?? "",
  email: o.email ?? "",
  phone: o.phone ?? o.mobile ?? "",
  status: o.status ?? o.state ?? "",
  role: o.role ?? "user",
  createdAt: o.createdAt ?? o.created_at ?? o.created ?? null,
  avatar: o.avatar ?? "/mnt/data/ea3bee50-9964-4c5b-a139-dd78dc24dfb3.png",
  coins: Number(o.coins ?? o.wallet ?? 0),
  ...o,
});

export default function AccountManager() {
  const [tab, setTab] = useState("accounts");

  // start empty — no mock data
  const [accounts, setAccounts] = useState([]);
  const [reports, setReports] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const [loading, setLoading] = useState(false);
  const [listMsg, setListMsg] = useState("");

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // modal / detail states
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailMsg, setDetailMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // fetch lists from API on mount
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      setListMsg("");
      try {
        const [accRes, repRes, blkRes] = await Promise.all([
          axios.get("/api/accounts"),
          axios.get("/api/reports"),
          axios.get("/api/blocked"),
        ]);

        const accData = Array.isArray(accRes.data)
          ? accRes.data
          : accRes.data?.data ?? accRes.data?.result ?? null;
        const repData = Array.isArray(repRes.data)
          ? repRes.data
          : repRes.data?.data ?? repRes.data?.result ?? null;
        const blkData = Array.isArray(blkRes.data)
          ? blkRes.data
          : blkRes.data?.data ?? blkRes.data?.result ?? null;

        setAccounts(Array.isArray(accData) ? accData.map(normalize) : []);
        setReports(Array.isArray(repData) ? repData : []);
        setBlocked(Array.isArray(blkData) ? blkData : []);
      } catch (err) {
        console.warn("List fetch failed:", err);
        setListMsg("Không thể tải dữ liệu từ API — danh sách trống.");
        // leave accounts/reports/blocked as empty arrays
        setAccounts([]);
        setReports([]);
        setBlocked([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  // filtered accounts for search
  const filteredAccounts = safeArr(accounts).filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(a.id).toLowerCase().includes(q) ||
      String(a.name ?? "")
        .toLowerCase()
        .includes(q) ||
      String(a.email ?? "")
        .toLowerCase()
        .includes(q)
    );
  });

  // view details: prefer API; fallback to local list item if API fails
  const viewDetails = async (id) => {
    setModalOpen(true);
    setIsEditing(false);
    setDetail(null);
    setDetailMsg("");
    setLoadingDetail(true);

    try {
      const res = await axios.get(`/api/accounts/${id}`);
      const payload = res?.data?.data ?? res?.data ?? null;
      setDetail(normalize(payload));
    } catch (err) {
      console.warn("GET detail failed - fallback to local", err);
      setDetailMsg(
        "Không lấy được từ API — hiển thị dữ liệu từ danh sách (nếu có)."
      );
      const local =
        safeArr(accounts).find((a) => Number(a.id) === Number(id)) ?? {};
      setDetail(normalize(local));
    } finally {
      setLoadingDetail(false);
    }
  };

  // open edit: prefer API; fallback to local
  const openEdit = async (id) => {
    setModalOpen(true);
    setIsEditing(true);
    setDetail(null);
    setDetailMsg("");
    setLoadingDetail(true);

    try {
      const res = await axios.get(`/api/accounts/${id}`);
      const payload = res?.data?.data ?? res?.data ?? {};
      setDetail({ ...normalize(payload), password: "" });
    } catch (err) {
      console.warn("GET for edit failed - using local", err);
      setDetailMsg(
        "Không lấy được từ API — đang chỉnh sửa dữ liệu từ danh sách."
      );
      const local =
        safeArr(accounts).find((a) => Number(a.id) === Number(id)) ?? {};
      setDetail({ ...normalize(local), password: "" });
    } finally {
      setLoadingDetail(false);
    }
  };

  // save edit: try PUT, on success update list; on fail apply local update
  const saveEdit = async () => {
    if (!detail) return;
    if (!detail.name?.trim() || !detail.email?.trim()) {
      alert("Tên và Email không được để trống.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: detail.name,
        email: detail.email,
        phone: detail.phone,
        role: detail.role,
        coins: Number(detail.coins ?? 0),
      };
      if (detail.password && detail.password.trim())
        payload.password = detail.password;

      const res = await axios.put(`/api/accounts/${detail.id}`, payload);
      const updated = res?.data?.data ?? res?.data ?? payload;
      setAccounts((prev) =>
        prev.map((a) =>
          Number(a.id) === Number(detail.id)
            ? normalize({ ...a, ...updated })
            : a
        )
      );
      setModalOpen(false);
      setDetail(null);
      setIsEditing(false);
    } catch (err) {
      console.warn("PUT failed - applying local update", err);
      setAccounts((prev) =>
        prev.map((a) =>
          Number(a.id) === Number(detail.id)
            ? {
                ...a,
                name: detail.name,
                email: detail.email,
                phone: detail.phone,
                role: detail.role,
                coins: Number(detail.coins ?? 0),
              }
            : a
        )
      );
      setModalOpen(false);
      setDetail(null);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // delete: try API, fallback local removal
  const deleteAccount = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
    try {
      await axios.delete(`/api/accounts/${id}`);
      setAccounts((prev) => prev.filter((a) => Number(a.id) !== Number(id)));
      setReports((prev) => prev.filter((r) => r.accountId !== id));
      setBlocked((prev) => prev.filter((b) => Number(b.id) !== Number(id)));
    } catch (err) {
      console.warn("DELETE failed - removing locally", err);
      setAccounts((prev) => prev.filter((a) => Number(a.id) !== Number(id)));
      setReports((prev) => prev.filter((r) => r.accountId !== id));
      setBlocked((prev) => prev.filter((b) => Number(b.id) !== Number(id)));
    }
  };

  const fmtDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Tài khoản</h2>
        <div>
          {loading ? (
            <span className="text-sm text-gray-500">Đang tải...</span>
          ) : (
            <span className="text-sm text-gray-500">
              {safeArr(accounts).length} tài khoản
            </span>
          )}
        </div>
      </div>

      {listMsg && <p className="text-yellow-600 mb-3">{listMsg}</p>}

      <div className="flex gap-6 border-b pb-2 mb-4">
        <button
          className={tab === "accounts" ? "font-semibold" : "text-gray-500"}
          onClick={() => setTab("accounts")}
        >
          Tài khoản
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

      {tab === "accounts" && (
        <>
          <div className="flex mb-4 justify-between items-center">
            <input
              ref={searchRef}
              className="border px-3 py-2 rounded w-64"
              placeholder="Tìm kiếm theo tên, email hoặc ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-sm text-gray-500">
              {filteredAccounts.length} kết quả
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-gray-600">
                  <th className="py-2 w-16">#</th>
                  <th className="py-2">Tên</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Túi xu</th>
                  <th className="py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{a.id}</td>
                    <td className="py-2">{a.name}</td>
                    <td className="py-2">{a.email}</td>
                    <td className="py-2">{a.role ?? "-"}</td>
                    <td className="py-2">{Number(a.coins ?? 0)}</td>
                    <td className="py-2 flex gap-2">
                      <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => viewDetails(a.id)}
                      >
                        Chi tiết
                      </button>
                      <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => openEdit(a.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 border text-red-600 rounded text-sm"
                        onClick={() => deleteAccount(a.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredAccounts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      Không tìm thấy tài khoản
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "reports" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="py-2 w-16">#</th>
                <th className="py-2">Tên tài khoản</th>
                <th className="py-2">Lý do</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {safeArr(reports).map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.id}</td>
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.reason}</td>
                  <td className="py-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => viewDetails(r.id)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
              {safeArr(reports).length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
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
                <th className="py-2 w-16">#</th>
                <th className="py-2">Tên</th>
                <th className="py-2">Lý do</th>
                <th className="py-2">Ngày chặn</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {safeArr(blocked).map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="py-2">{b.id}</td>
                  <td className="py-2">{b.name}</td>
                  <td className="py-2">{b.reason}</td>
                  <td className="py-2">{b.blockedAt ?? "-"}</td>
                  <td className="py-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => viewDetails(b.id)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
              {safeArr(blocked).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    Không có tài khoản bị chặn
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Sửa tài khoản" : "Chi tiết tài khoản"}
              </h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setDetail(null);
                  setIsEditing(false);
                  setDetailMsg("");
                }}
              >
                ✕
              </button>
            </div>

            {loadingDetail ? (
              <div className="py-8 text-center text-gray-500">Đang tải...</div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-40 h-40 rounded border overflow-hidden bg-gray-50">
                    <img
                      src={
                        detail?.avatar ??
                        "/mnt/data/ea3bee50-9964-4c5b-a139-dd78dc24dfb3.png"
                      }
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="px-3 py-1 rounded bg-gray-100 text-sm">
                      {detail?.role ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="col-span-8">
                  {detailMsg && (
                    <p className="text-yellow-600 mb-2">{detailMsg}</p>
                  )}

                  {!isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Tên</p>
                          <p className="font-medium text-lg">
                            {detail?.name ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Túi xu</p>
                          <p className="font-medium">
                            {Number(detail?.coins ?? 0)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{detail?.email ?? "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Ngày tạo</p>
                        <p className="font-medium">
                          {fmtDate(detail?.createdAt)}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end gap-3">
                        <button
                          className="px-3 py-2 border rounded"
                          onClick={() => {
                            setModalOpen(false);
                            setDetail(null);
                          }}
                        >
                          Đóng
                        </button>
                        <button
                          className="px-3 py-2 bg-blue-600 text-white rounded"
                          onClick={() => openEdit(detail?.id)}
                        >
                          Sửa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">Tên</label>
                        <input
                          className="w-full border px-3 py-2 rounded"
                          value={detail?.name ?? ""}
                          onChange={(e) =>
                            setDetail((p) => ({ ...p, name: e.target.value }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Email</label>
                        <input
                          className="w-full border px-3 py-2 rounded"
                          value={detail?.email ?? ""}
                          onChange={(e) =>
                            setDetail((p) => ({ ...p, email: e.target.value }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Role</label>
                        <select
                          className="w-full border px-3 py-2 rounded"
                          value={detail?.role ?? "user"}
                          onChange={(e) =>
                            setDetail((p) => ({ ...p, role: e.target.value }))
                          }
                        >
                          <option value="user">user</option>
                          <option value="moderator">moderator</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm">Túi xu (coins)</label>
                        <input
                          type="number"
                          className="w-full border px-3 py-2 rounded"
                          value={Number(detail?.coins ?? 0)}
                          onChange={(e) =>
                            setDetail((p) => ({
                              ...p,
                              coins: Number(e.target.value),
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">
                          Password (để trống nếu không đổi)
                        </label>
                        <input
                          type="password"
                          className="w-full border px-3 py-2 rounded"
                          value={detail?.password ?? ""}
                          onChange={(e) =>
                            setDetail((p) => ({
                              ...p,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          className="px-3 py-2 border rounded"
                          onClick={() => {
                            setIsEditing(false);
                            setDetail(null);
                            setModalOpen(false);
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded"
                          onClick={saveEdit}
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