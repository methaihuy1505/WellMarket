// src/components/Admin/EventManager.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * EventManager.jsx
 *
 * - No images
 * - End input is time only (HH:MM). End ISO constructed from start's date + this time.
 * - frontend-only id: created if backend doesn't provide one
 * - Validations:
 *    * start must be >= now for create
 *    * end (constructed) must be after start
 * - Filters: by gameType, type (day/month), date range (start date from-to)
 *
 * Usage: import and render in Admin dashboard page.
 */

// ---------- constants ----------
const GAME_TYPES = ["Đoán chữ", "Nhanh tay nhanh mắt", "Trắc nghiệm", "Đố vui"];

const makeId = () =>
  Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

// ---------- helpers ----------
const safeArr = (a) => (Array.isArray(a) ? a : []);
const nowIsoShort = () => new Date().toISOString().slice(0, 16); // for datetime-local value (YYYY-MM-DDTHH:mm)
const dateOnlyIso = (iso) =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";
const fmtDateTime = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};
const isPast = (iso) => {
  if (!iso) return false;
  try {
    return new Date(iso) < new Date();
  } catch {
    return false;
  }
};

// Normalize API object into internal shape
const normalizeEvent = (ev = {}) => ({
  id: ev.id ?? makeId(),
  title: ev.title ?? ev.name ?? "",
  type: ev.type ?? ev.event_type ?? "day", // 'day' | 'month'
  start: ev.start ?? ev.startAt ?? null, // ISO string
  end: ev.end ?? ev.endAt ?? null, // ISO string
  coins: Number(ev.coins ?? 0),
  participants: ev.participants ?? [],
  gameType: ev.gameType ?? ev.game_type ?? GAME_TYPES[0],
  ...ev,
});

// ---------- component ----------
export default function EventManager() {
  // events from API
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // info or error messages

  // search & filters
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const [filterType, setFilterType] = useState(""); // "" | "day" | "month"
  const [filterGame, setFilterGame] = useState(""); // "" or gameType
  const [filterFrom, setFilterFrom] = useState(""); // date yyyy-mm-dd
  const [filterTo, setFilterTo] = useState(""); // date yyyy-mm-dd

  // modal/edit/create
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view"); // 'view' | 'edit' | 'create'
  const [current, setCurrent] = useState(null); // event object for view/edit/create
  const [currentEndTime, setCurrentEndTime] = useState(""); // "HH:MM" for edit/create form
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);

  // fetch events once on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setMsg("");
      try {
        const res = await axios.get("/api/events");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? res.data ?? [];
        const norm = safeArr(data).map(normalizeEvent);
        setEvents(norm);
      } catch (err) {
        console.warn("GET /api/events failed:", err);
        setMsg("Không thể tải sự kiện từ API — danh sách rỗng.");
        setEvents([]); // no mock fallback as requested
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    setTimeout(() => searchRef.current?.focus(), 120);
  }, []);

  // ----- filtering -----
  const filtered = safeArr(events).filter((ev) => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !(
          String(ev.title ?? "")
            .toLowerCase()
            .includes(q) ||
          String(ev.gameType ?? "")
            .toLowerCase()
            .includes(q) ||
          String(ev.type ?? "")
            .toLowerCase()
            .includes(q) ||
          String(ev.coins ?? 0).includes(q)
        )
      )
        return false;
    }
    if (filterType && ev.type !== filterType) return false;
    if (filterGame && ev.gameType !== filterGame) return false;

    // date range based on ev.start date (date only)
    if (filterFrom) {
      const fromMs = new Date(filterFrom + "T00:00:00").getTime();
      const evStartDateMs = ev.start
        ? new Date(ev.start).setHours(0, 0, 0, 0)
        : null;
      if (evStartDateMs === null || evStartDateMs < fromMs) return false;
    }
    if (filterTo) {
      const toMs = new Date(filterTo + "T23:59:59").getTime();
      const evStartDateMs = ev.start ? new Date(ev.start).getTime() : null;
      if (evStartDateMs === null || evStartDateMs > toMs) return false;
    }

    return true;
  });

  // ----- view detail (GET /api/events/:id) -----
  const viewDetails = async (id) => {
    setMode("view");
    setModalOpen(true);
    setCurrent(null);
    setCurrentEndTime("");
    setLoadingDetail(true);
    setMsg("");

    try {
      const res = await axios.get(`/api/events/${id}`);
      const payload = res?.data?.data ?? res?.data ?? null;
      setCurrent(normalizeEvent(payload));
    } catch (err) {
      console.warn(`GET /api/events/${id} failed:`, err);
      setMsg(
        "Không lấy được chi tiết từ API — hiển thị dữ liệu hiện có (nội bộ)."
      );
      const local =
        safeArr(events).find((e) => String(e.id) === String(id)) ?? null;
      setCurrent(local ? { ...local } : null);
    } finally {
      setLoadingDetail(false);
    }
  };

  // ----- open edit (GET detail then edit) -----
  const openEdit = async (id) => {
    setMode("edit");
    setModalOpen(true);
    setCurrent(null);
    setCurrentEndTime("");
    setLoadingDetail(true);
    setMsg("");

    try {
      const res = await axios.get(`/api/events/${id}`);
      const payload = res?.data?.data ?? res?.data ?? {};
      const n = normalizeEvent(payload);
      // derive HH:MM from n.end if available
      const endHHMM = n.end ? new Date(n.end).toISOString().slice(11, 16) : "";
      setCurrent(n);
      setCurrentEndTime(endHHMM);
    } catch (err) {
      console.warn(`GET /api/events/${id} failed (edit):`, err);
      setMsg("Không lấy được chi tiết từ API — chỉnh sửa dữ liệu nội bộ.");
      const local =
        safeArr(events).find((e) => String(e.id) === String(id)) ?? null;
      if (local) {
        const endHHMM = local.end
          ? new Date(local.end).toISOString().slice(11, 16)
          : "";
        setCurrent({ ...local });
        setCurrentEndTime(endHHMM);
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  // ----- create open -----
  const openCreate = () => {
    setMode("create");
    setModalOpen(true);
    setCurrent({
      title: "",
      type: "day",
      start: "", // datetime-local string expected YYYY-MM-DDTHH:mm
      end: null,
      coins: 0,
      participants: [],
      gameType: GAME_TYPES[0],
    });
    setCurrentEndTime("");
    setMsg("");
  };

  // ----- helper build end ISO from start + HH:MM -----
  const buildEndIso = (startIso, hhmm) => {
    if (!startIso) return null;
    if (!hhmm) return null;
    try {
      const start = new Date(startIso);
      const [hh, mm] = hhmm.split(":").map((s) => Number(s));
      const endDate = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        hh,
        mm,
        0,
        0
      );
      return endDate.toISOString();
    } catch {
      return null;
    }
  };

  // ----- validate before save -----
  const validateCurrent = () => {
    if (!current) return "Dữ liệu rỗng.";
    if (!current.title || !current.title.trim())
      return "Tên sự kiện không được để trống.";
    if (!current.start) return "Vui lòng chọn thời gian bắt đầu.";
    // for create: enforce start >= now
    if (mode === "create") {
      const startMs = new Date(current.start).getTime();
      const nowMs = Date.now();
      if (startMs < nowMs - 1000)
        return "Ngày/giờ bắt đầu phải là hiện tại hoặc tương lai.";
    }
    // construct endIso if user provided end time
    const endIso = buildEndIso(current.start, currentEndTime);
    if (currentEndTime && !endIso) return "Thời gian kết thúc không hợp lệ.";
    if (endIso && new Date(endIso) <= new Date(current.start))
      return "Thời gian kết thúc phải sau thời gian bắt đầu.";
    return null;
  };

  // ----- save create or edit -----
  const save = async () => {
    const err = validateCurrent();
    if (err) {
      alert(err);
      return;
    }

    setSaving(true);
    try {
      // Build payload to send. Do not include frontend id in POST body.
      const endIso =
        buildEndIso(current.start, currentEndTime) ?? current.end ?? null;
      const payload = {
        title: current.title,
        type: current.type,
        start: current.start,
        end: endIso,
        coins: Number(current.coins ?? 0),
        gameType: current.gameType ?? GAME_TYPES[0],
      };

      if (mode === "create") {
        // POST /api/events (no id in body)
        const res = await axios.post("/api/events", payload);
        const created = res?.data?.data ?? res?.data ?? payload;

        // If backend returns an event with id, use it; else create frontend id
        const createdNormalized = normalizeEvent(created);
        // If backend didn't return id and the createdNormalized.id is a generated one,
        // make sure we use createdNormalized (it will have id)
        setEvents((prev) => [createdNormalized, ...prev]);
      } else {
        // edit - PUT /api/events/:id (we include id in URL but not in body)
        await axios.put(`/api/events/${current.id}`, payload).catch((e) => {
          // allow fallback if PUT fails
          console.warn("PUT failed; fallback to local update", e);
        });

        // update local state regardless
        setEvents((prev) =>
          prev.map((ev) =>
            String(ev.id) === String(current.id)
              ? normalizeEvent({ ...ev, ...payload })
              : ev
          )
        );
      }

      setModalOpen(false);
      setCurrent(null);
      setCurrentEndTime("");
    } catch (e) {
      console.error("Save failed:", e);
      // fallback local application
      if (mode === "create") {
        const newEv = normalizeEvent({ ...payload, id: makeId() });
        setEvents((prev) => [newEv, ...prev]);
      } else {
        setEvents((prev) =>
          prev.map((ev) =>
            String(ev.id) === String(current.id) ? { ...ev, ...payload } : ev
          )
        );
      }
      setModalOpen(false);
      setCurrent(null);
      setCurrentEndTime("");
    } finally {
      setSaving(false);
    }
  };

  // ----- delete ----- (DELETE /api/events/:id)
  const remove = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sự kiện này?")) return;
    try {
      await axios.delete(`/api/events/${id}`).catch((e) => {
        console.warn("DELETE API may have failed - apply local remove", e);
      });
      setEvents((prev) => prev.filter((ev) => String(ev.id) !== String(id)));
    } catch (err) {
      console.error("Remove error:", err);
      setEvents((prev) => prev.filter((ev) => String(ev.id) !== String(id)));
    }
  };

  // ----- UI -----
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Sự kiện</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Tạo sự kiện
          </button>
          <div className="text-sm text-gray-500">
            {loading ? "Đang tải..." : `${safeArr(events).length} sự kiện`}
          </div>
        </div>
      </div>

      {msg && <p className="text-yellow-600 mb-3">{msg}</p>}

      {/* filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          ref={searchRef}
          className="border px-3 py-2 rounded w-64"
          placeholder="Tìm theo tên, trò chơi, loại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Tất cả loại</option>
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filterGame}
          onChange={(e) => setFilterGame(e.target.value)}
        >
          <option value="">Tất cả trò chơi</option>
          {GAME_TYPES.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Từ</span>
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Đến</span>
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
          />
        </div>

        <button
          className="px-3 py-2 border rounded"
          onClick={() => {
            setFilterFrom("");
            setFilterTo("");
            setFilterGame("");
            setFilterType("");
            setSearch("");
          }}
        >
          Reset
        </button>

        <div className="text-sm text-gray-500 ml-auto">
          {filtered.length} kết quả
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-600">
              <th className="py-2 w-14">#</th>
              <th className="py-2">Tên</th>
              <th className="py-2">Ngày</th>
              <th className="py-2">Loại</th>
              <th className="py-2">Số xu</th>
              <th className="py-2">Thời gian</th>
              <th className="py-2">Trò chơi</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, idx) => {
              const ended = isPast(ev.end);
              const dayLabel = ev.type === "month" ? "Tháng" : "Ngày";
              return (
                <tr
                  key={ev.id}
                  className={`border-b hover:bg-gray-50 ${
                    ended ? "opacity-60" : ""
                  }`}
                >
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2">{ev.title}</td>
                  <td className="py-2">{dateOnlyIso(ev.start) || "-"}</td>
                  <td className="py-2">{dayLabel}</td>
                  <td className="py-2">{Number(ev.coins ?? 0)}</td>
                  <td className="py-2">
                    {fmtDateTime(ev.start)} - {fmtDateTime(ev.end)}
                  </td>
                  <td className="py-2">{ev.gameType ?? "-"}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => viewDetails(ev.id)}
                    >
                      Chi tiết
                    </button>
                    <button
                      className={`px-3 py-1 border rounded text-sm ${
                        ended
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => !ended && openEdit(ev.id)}
                      disabled={ended}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 border text-red-600 rounded text-sm"
                      onClick={() => remove(ev.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  Không tìm thấy sự kiện
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded p-6 shadow-lg overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {mode === "view"
                  ? "Chi tiết sự kiện"
                  : mode === "edit"
                  ? "Sửa sự kiện"
                  : "Tạo sự kiện"}
              </h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCurrent(null);
                  setCurrentEndTime("");
                }}
              >
                ✕
              </button>
            </div>

            {loadingDetail ? (
              <div className="py-8 text-center text-gray-500">Đang tải...</div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  {mode === "view" ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Tên</p>
                          <p className="font-medium text-lg">
                            {current?.title ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Loại</p>
                          <p className="font-medium">
                            {current?.type === "month" ? "Tháng" : "Ngày"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Thời gian</p>
                          <p className="font-medium">
                            {fmtDateTime(current?.start)} -{" "}
                            {fmtDateTime(current?.end)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Tổng xu thưởng
                          </p>
                          <p className="font-medium">
                            {Number(current?.coins ?? 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Loại trò chơi</p>
                          <p className="font-medium">
                            {current?.gameType ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Người tham gia
                          </p>
                          <div className="mt-2 border rounded p-2 max-h-40 overflow-auto">
                            {safeArr(current?.participants).length === 0 ? (
                              <div className="text-gray-500">
                                Chưa có người tham gia
                              </div>
                            ) : (
                              <ul className="space-y-2">
                                {current.participants.map((p) => (
                                  <li
                                    key={p.id}
                                    className="flex justify-between items-center"
                                  >
                                    <div>
                                      <div className="font-medium">
                                        {p.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {p.email}
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ID: {p.id}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

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
                            onClick={() => openEdit(current?.id)}
                          >
                            Sửa
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // create / edit form
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">Tên</label>
                        <input
                          className="w-full border px-3 py-2 rounded"
                          value={current?.title ?? ""}
                          onChange={(e) =>
                            setCurrent((p) => ({ ...p, title: e.target.value }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Loại</label>
                        <select
                          className="w-full border px-3 py-2 rounded"
                          value={current?.type ?? "day"}
                          onChange={(e) =>
                            setCurrent((p) => ({ ...p, type: e.target.value }))
                          }
                        >
                          <option value="day">Ngày</option>
                          <option value="month">Tháng</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm">Thời gian bắt đầu</label>
                          <input
                            type="datetime-local"
                            className="w-full border px-3 py-2 rounded"
                            value={
                              current?.start
                                ? new Date(current.start)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            min={nowIsoShort()}
                            onChange={(e) => {
                              const v = e.target.value;
                              setCurrent((p) => ({
                                ...p,
                                start: v ? new Date(v).toISOString() : "",
                              }));
                            }}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Chỉ cho chọn ngày hiện tại hoặc tương lai khi tạo.
                          </p>
                        </div>

                        <div>
                          <label className="text-sm">
                            Thời gian kết thúc (giờ:phút)
                          </label>
                          <input
                            type="time"
                            className="w-full border px-3 py-2 rounded"
                            value={currentEndTime ?? ""}
                            onChange={(e) => setCurrentEndTime(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Kết thúc dùng ngày từ "Thời gian bắt đầu" + giờ:phút
                            ở đây.
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm">Số xu thưởng</label>
                        <input
                          type="number"
                          min={0}
                          className="w-full border px-3 py-2 rounded"
                          value={Number(current?.coins ?? 0)}
                          onChange={(e) =>
                            setCurrent((p) => ({
                              ...p,
                              coins: Number(e.target.value),
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm">Loại trò chơi</label>
                        <select
                          className="w-full border px-3 py-2 rounded"
                          value={current?.gameType ?? GAME_TYPES[0]}
                          onChange={(e) =>
                            setCurrent((p) => ({
                              ...p,
                              gameType: e.target.value,
                            }))
                          }
                        >
                          {GAME_TYPES.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          className="px-3 py-2 border rounded"
                          onClick={() => {
                            setModalOpen(false);
                            setCurrent(null);
                            setCurrentEndTime("");
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