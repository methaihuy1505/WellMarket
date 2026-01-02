import { useState } from "react";
import axios from "../../utils/axios";

const reasons = [
  "Hàng giả / lừa đảo",
  "Nội dung không phù hợp",
  "Giá không đúng thực tế",
  "Spam / quảng cáo",
  "Khác"
];

export default function ReportModal({
  open,
  onClose,
  userId,
  targetId,
  targetType
}) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!reason) return alert("Vui lòng chọn lý do");

    setLoading(true);
    try {
      await axios.post("/interactions", {
        user_id: userId,
        target_id: targetId,
        target_type: targetType, // "post"
        interaction_type: "report",
        comment: `${reason}${comment ? " - " + comment : ""}`
      });

      alert("Đã gửi báo cáo");
      onClose();
    } catch (e) {
      alert("Gửi báo cáo thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-4">
        <h3 className="font-semibold text-lg mb-3">
          Báo cáo bài đăng
        </h3>

        <div className="space-y-2 mb-3">
          {reasons.map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
              />
              {r}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Mô tả chi tiết (không bắt buộc)"
          className="w-full border rounded p-2 text-sm mb-3"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
