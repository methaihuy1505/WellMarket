import { useState, useEffect } from "react";
import api from "../../utils/api";
import { LoginModal } from "../Modal/LoginModal";

export default function ReportModal({ open, onClose, targetId, targetType }) {
  const [reasons, setReasons] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [selectedReasonText, setSelectedReasonText] = useState("");
  const [extraText, setExtraText] = useState(""); // nhập thêm mô tả
  const [loading, setLoading] = useState(false);

  const token =
    localStorage.getItem("userToken") ?? localStorage.getItem("adminToken");

  useEffect(() => {
    if (open) {
      loadReasons();
    }
  }, [open, targetType]);

  const loadReasons = async () => {
    try {
      const res = await api.get("/report-reasons", {
        params: { scope: targetType }, // ví dụ: "post"
      });
      setReasons(res.data);
    } catch (err) {
      console.error("Load report reasons failed:", err);
    }
  };

  if (!open) return null;

  const submit = async () => {
    if (!token) {
      LoginModal.show();
      return;
    }
    if (!selectedReasonId) return alert("Vui lòng chọn lý do");

    setLoading(true);
    try {
      await api.post("/interactions/report", {
        target_id: targetId,
        target_type: targetType,
        interaction_type: "report",
        reason_id: selectedReasonId,
        reason_text: extraText
          ? `${selectedReasonText} - ${extraText}`
          : selectedReasonText,
      });

      alert("Đã gửi báo cáo");
      onClose();
      setSelectedReasonId(null);
      setSelectedReasonText("");
      setExtraText("");
    } catch (e) {
      alert("Gửi báo cáo thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-4">
        <h3 className="font-semibold text-lg mb-3">Báo cáo bài đăng</h3>

        <div className="space-y-2 mb-3">
          {reasons.map((r) => (
            <label key={r.id} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="reason"
                value={r.id}
                checked={selectedReasonId === r.id}
                onChange={() => {
                  setSelectedReasonId(r.id);
                  setSelectedReasonText(r.title);
                }}
              />
              {r.title}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Mô tả chi tiết (không bắt buộc)"
          className="w-full border rounded p-2 text-sm mb-3"
          rows={3}
          value={extraText}
          onChange={(e) => setExtraText(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded"
          >
            Hủy
          </button>
          <button
            disabled={loading}
            onClick={submit}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded"
          >
            {loading ? "Đang gửi..." : "Gửi báo cáo"}
          </button>
        </div>
      </div>
    </div>
  );
}
