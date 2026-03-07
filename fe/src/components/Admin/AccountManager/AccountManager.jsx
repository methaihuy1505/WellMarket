import React, { useEffect, useRef, useState } from "react";
import api from "../../../utils/api";

import AccountTabs from "./AccountTabs";
import AccountsTable from "./AccountsTable";
import ReportsTable from "./ReportsTable";
import BlockedTable from "./BlockedTable";
import AccountModal from "./AccountModal";
import { safeArr, normalize, fmtDate } from "../../../utils/utils";

export default function AccountManager() {
  const [tab, setTab] = useState("accounts");

  const [accounts, setAccounts] = useState([]);
  const [reports, setReports] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const [loading, setLoading] = useState(false);
  const [listMsg, setListMsg] = useState("");

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // modal / detail
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailMsg, setDetailMsg] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= FETCH LIST ================= */
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      setListMsg("");
      try {
        // Cập nhật URL đúng theo backend mới sửa
        const [accRes, repRes, blkRes] = await Promise.all([
          api.get("/accounts"),
          api.get("/reports/users"), // <-- Đã sửa URL
          api.get("/blocked"),
        ]);

        const accData =
          accRes.data?.data ?? accRes.data?.result ?? accRes.data ?? [];
        const repData =
          repRes.data?.data ?? repRes.data?.result ?? repRes.data ?? [];
        const blkData =
          blkRes.data?.data ?? blkRes.data?.result ?? blkData.data ?? [];

        setAccounts(safeArr(accData).map(normalize));
        setReports(safeArr(repData));
        setBlocked(safeArr(blkData));
      } catch (err) {
        console.warn("Fetch list failed", err);
        setListMsg("Không thể tải dữ liệu từ API.");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  /* ================= SEARCH ================= */
  const filteredAccounts = safeArr(accounts).filter((a) => {
    if (tab !== "accounts") return true;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(a.id).includes(q) ||
      a.name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
    );
  });

  const filteredReports = safeArr(reports).filter((r) => {
    if (tab !== "reports") return true;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(r.id).includes(q) ||
      String(r.accountId).includes(q) ||
      r.reason?.toLowerCase().includes(q)
    );
  });

  const filteredBlocked = safeArr(blocked).filter((b) => {
    if (tab !== "blocked") return true;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(b.id).includes(q) ||
      String(b.accountId).includes(q) ||
      b.reason?.toLowerCase().includes(q)
    );
  });

  /* ================= DETAIL & EDIT ================= */
  const viewDetails = async (id) => {
    setModalOpen(true);
    setIsEditing(false);
    setDetail(null);
    setDetailMsg("");
    setLoadingDetail(true);
    try {
      const res = await api.get(`/accounts/${id}`);
      setDetail(normalize(res.data?.data ?? res.data));
    } catch (err) {
      setDetailMsg("Không lấy được từ API, hiển thị dữ liệu cục bộ.");
      const local = safeArr(accounts).find((a) => Number(a.id) === Number(id));
      setDetail(normalize(local));
    } finally {
      setLoadingDetail(false);
    }
  };

  const openEdit = async (id) => {
    setModalOpen(true);
    setIsEditing(true);
    setDetail(null);
    setDetailMsg("");
    setLoadingDetail(true);
    try {
      const res = await api.get(`/accounts/${id}`);
      setDetail({ ...normalize(res.data?.data ?? res.data), password: "" });
    } catch (err) {
      const local = safeArr(accounts).find((a) => Number(a.id) === Number(id));
      setDetail({ ...normalize(local), password: "" });
    } finally {
      setLoadingDetail(false);
    }
  };

  const saveEdit = async () => {
    if (!detail?.name || !detail?.email) {
      alert("Tên và Email không được để trống");
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
        status: detail.status, // Gửi cả status nếu có sửa trong modal
      };
      if (detail.password?.trim()) payload.password = detail.password;

      const res = await api.put(`/accounts/${detail.id}`, payload);
      const updated = res.data?.data ?? payload;

      setAccounts((prev) =>
        prev.map((a) =>
          Number(a.id) === Number(detail.id)
            ? normalize({ ...a, ...updated })
            : a
        )
      );
    } catch (err) {
      console.warn("Save failed", err);
      alert("Cập nhật thất bại");
    } finally {
      setSaving(false);
      setModalOpen(false);
      setIsEditing(false);
      setDetail(null);
    }
  };

  /* ================= TOGGLE STATUS (LOGIC MỚI) ================= */
  const toggleAccountStatus = async (account) => {
    const isBanned = account.status === "banned";
    const actionText = isBanned ? "BỎ CHẶN" : "KHÓA";

    if (
      !window.confirm(
        `Bạn có chắc muốn ${actionText} tài khoản "${account.name}" không?`
      )
    )
      return;

    try {
      // Gọi API toggle
      await api.post(`/accounts/${account.id}/toggle-status`);

      const newStatus = isBanned ? "active" : "banned";

      // 1. Cập nhật State Accounts: Đổi status ngay lập tức
      setAccounts((prev) =>
        prev.map((a) =>
          Number(a.id) === Number(account.id) ? { ...a, status: newStatus } : a
        )
      );

      // 2. Đồng bộ State Blocked
      if (isBanned) {
        // Nếu đang Banned -> Active: Xóa khỏi danh sách Blocked
        setBlocked((prev) =>
          prev.filter((b) => Number(b.id) !== Number(account.id))
        );
      } else {
        // Nếu đang Active -> Banned: Thêm vào danh sách Blocked
        const blockedUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          accountId: account.id,
          reason: "Admin khóa thủ công",
          blockedAt: new Date().toISOString(),
        };
        setBlocked((prev) => [blockedUser, ...prev]);
      }
    } catch (err) {
      console.warn("Toggle status failed", err);
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  /* ================= RENDER ================= */
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Tài khoản</h2>
        <span className="text-sm text-gray-500">
          {loading ? "Đang tải..." : `${accounts.length} tài khoản`}
        </span>
      </div>

      {listMsg && <p className="text-yellow-600 mb-3">{listMsg}</p>}

      <div className="mb-3 flex justify-between">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            tab === "accounts"
              ? "Tìm theo ID / tên / email"
              : "Tìm theo ID / account / lý do"
          }
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <AccountTabs tab={tab} setTab={setTab} />

      {tab === "accounts" && (
        <AccountsTable
          accounts={filteredAccounts}
          onView={viewDetails}
          onEdit={openEdit}
          // Truyền prop mới
          onToggleStatus={toggleAccountStatus}
        />
      )}

      {tab === "reports" && (
        <ReportsTable reports={filteredReports} onView={viewDetails} />
      )}

      {tab === "blocked" && (
        <BlockedTable blocked={filteredBlocked} onView={viewDetails} />
      )}

      <AccountModal
        open={modalOpen}
        isEditing={isEditing}
        loadingDetail={loadingDetail}
        detail={detail}
        detailMsg={detailMsg}
        saving={saving}
        setDetail={setDetail}
        setIsEditing={setIsEditing}
        onEdit={openEdit}
        onSave={saveEdit}
        onClose={() => {
          setModalOpen(false);
          setDetail(null);
          setIsEditing(false);
          setDetailMsg("");
        }}
      />
    </div>
  );
}
