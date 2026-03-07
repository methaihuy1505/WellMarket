import React, { useEffect, useRef, useState } from "react";
import api from "../../../utils/api"; 
import EventFilters from "./EventFilters";
import EventTable from "./EventTable";
import EventModal from "./EventModal";
import { safeArr } from "../../../utils/utils";

export default function EventManager() {
  // Data states
  const [events, setEvents] = useState([]);
  const [gameTypes, setGameTypes] = useState([]); // List {id, name} từ DB

  // UI states
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Filters (Dùng cho Server-side filtering)
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGame, setFilterGame] = useState(""); 
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const searchRef = useRef(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [current, setCurrent] = useState(null);
  const [currentEndTime, setCurrentEndTime] = useState(""); 
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH DATA (Kèm Filter Server-side) ================= */
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Backend đã hỗ trợ filter query params, ta truyền thẳng lên
      const params = {
        search: search || undefined,
        type: filterType || undefined,
        game_id: filterGame || undefined,
        from: filterFrom || undefined,
        to: filterTo || undefined,
      };

      const res = await api.get("/admin/events", { params });
      setEvents(safeArr(res.data?.data));
    } catch (err) {
      console.error("Fetch events error", err);
      setMsg("Lỗi khi tải dữ liệu sự kiện.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGameTypes = async () => {
    try {
      const res = await api.get("/minigame-types");
      setGameTypes(safeArr(res.data?.data));
    } catch (err) {
      console.warn("Lỗi tải danh sách game types", err);
    }
  };

  // Tải list trò chơi lần đầu
  useEffect(() => {
    fetchGameTypes();
  }, []);

  // Tải list sự kiện mỗi khi filter thay đổi
  useEffect(() => {
    // Dùng timer để debounce (chờ người dùng gõ xong mới gọi API)
    const timer = setTimeout(() => {
      fetchEvents();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, filterType, filterGame, filterFrom, filterTo]);

  /* ================= ACTIONS ================= */
  const openCreate = () => {
    setModalOpen(true);
    setMode("create");
    setCurrent({
      coins: 0,
      type: "daily", 
      minigame_type_id: gameTypes[0]?.id || "",
      start: new Date().toISOString().slice(0, 16),
      description: "",
    });
    setCurrentEndTime("23:59");
  };

  const openEdit = (id) => {
    const found = events.find((e) => e.id === id);
    if (!found) return;

    setModalOpen(true);
    setMode("edit");

    // Lấy 16 ký tự đầu của chuỗi ISO (YYYY-MM-DDTHH:mm) để gán cho input datetime-local
    const startStr = found.start ? found.start.slice(0, 16) : "";

    setCurrent({
      ...found,
      minigame_type_id: found.gameTypeId, 
      start: startStr,
    });

    // Tách giờ kết thúc để gán vào input time
    if (found.end) {
      const d = new Date(found.end);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setCurrentEndTime(`${hh}:${mm}`);
    } else {
      setCurrentEndTime("");
    }
  };

  const viewDetails = (id) => {
    const found = events.find((e) => e.id === id);
    if (found) {
      setModalOpen(true);
      setMode("view");
      setCurrent(found);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) return;
    try {
      await api.delete(`/events/${id}`);
      // Lọc bỏ sự kiện vừa xóa khỏi state để giao diện cập nhật ngay
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Xóa sự kiện thất bại. Vui lòng thử lại.");
    }
  };

  const save = async () => {
    if (!current?.title || !current?.start || !currentEndTime) {
      alert("Vui lòng nhập đầy đủ Tên, Ngày bắt đầu và Giờ kết thúc");
      return;
    }
    
    setSaving(true);
    try {
      const startDateObj = new Date(current.start);

      // End date = Ngày của Start Date + Giờ của End Time
      const endDateString = `${current.start.slice(0, 10)}T${currentEndTime}`;
      const endDateObj = new Date(endDateString);

      if (endDateObj <= startDateObj) {
        alert("Thời gian kết thúc phải sau thời gian bắt đầu");
        setSaving(false);
        return;
      }

      // Payload đồng bộ đúng với các trường Validate trong EventController
      const payload = {
        name: current.title, 
        event_type: current.type,
        minigame_type_id: current.minigame_type_id,
        reward_amount: current.coins,
        start_date: startDateObj.toISOString(), 
        end_date: endDateObj.toISOString(),
        description: current.description || "",
      };

      if (mode === "create") {
        await api.post("/events", payload);
        alert("Tạo sự kiện thành công!");
      } else {
        await api.put(`/events/${current.id}`, payload);
        alert("Cập nhật sự kiện thành công!");
      }

      setModalOpen(false);
      fetchEvents(); // Tải lại danh sách mới nhất từ BE
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lưu sự kiện.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Quản lý Sự kiện</h2>
        <div className="flex gap-2 items-center">
          <button
            className="bg-pink-600 text-white px-3 py-2 rounded text-sm hover:bg-pink-700 transition-colors"
            onClick={openCreate}
          >
            + Tạo sự kiện
          </button>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {loading ? "Đang tải..." : `Tổng: ${events.length} sự kiện`}
          </span>
        </div>
      </div>

      {msg && <p className="text-red-500 bg-red-50 p-3 rounded mb-4 border border-red-100">{msg}</p>}

      <EventFilters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        filterGame={filterGame}
        setFilterGame={setFilterGame}
        filterFrom={filterFrom}
        setFilterFrom={setFilterFrom}
        filterTo={filterTo}
        setFilterTo={setFilterTo}
        gameTypes={gameTypes}
        resultCount={events.length}
        searchRef={searchRef}
        onReset={() => {
          setSearch("");
          setFilterType("");
          setFilterGame("");
          setFilterFrom("");
          setFilterTo("");
        }}
      />

      <EventTable
        events={events}
        onView={viewDetails}
        onEdit={openEdit}
        onDelete={remove}
      />

      <EventModal
        open={modalOpen}
        mode={mode}
        loading={loadingDetail}
        event={current}
        endTime={currentEndTime}
        gameTypes={gameTypes} 
        setEndTime={setCurrentEndTime}
        onClose={() => {
          setModalOpen(false);
          setCurrent(null);
          setCurrentEndTime("");
        }}
        onSave={save}
        onChange={(k, v) => setCurrent((p) => ({ ...p, [k]: v }))}
        saving={saving}
      />
    </div>
  );
}