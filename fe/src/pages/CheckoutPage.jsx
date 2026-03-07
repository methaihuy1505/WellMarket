import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import api from "../utils/api";
import BoostModal from "../components/Modal/BoostModal";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import usePostForm from "../hooks/usePostForm";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const token =
    localStorage.getItem("userToken") ?? localStorage.getItem("adminToken");
  const { sendData } = usePostForm();

  if (!state || !state.feeInfo) {
    navigate("/up-post");
    return null;
  }

  const { form, images, videos, feeInfo } = state;

  const [method, setMethod] = useState("bank_transfer");
  const [wcUsed, setWcUsed] = useState(0);
  const [boost, setBoost] = useState([]);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [qrInfo, setQrInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Tính tổng boost
  const boostTotal = boost.reduce((sum, b) => sum + b.price * b.quantity, 0);
  // Tổng cộng
  const total = Math.max(feeInfo.amount + boostTotal - wcUsed, 0);

  const handleAfterPayment = async (paymentId) => {
    setLoading(true);
    try {
      await sendData(images, videos, { ...form, payment_id: paymentId });
      setCompleted(true);
    } catch (err) {
      alert("Có lỗi khi tạo bài đăng");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      if (wcUsed > user.coins) {
        alert("Bạn không đủ WC để sử dụng số lượng này.");
        return;
      }

      const payload = {
        amount: total,
        payment_method: method,
        wc_used: wcUsed,
        breakdown: {
          base: feeInfo.breakdown.base,
          extra: feeInfo.breakdown.extra,
          boost: boost.reduce((sum, b) => sum + b.price * b.quantity, 0),
          wc: wcUsed,
        },
        boosts: boost.map((b) => ({
          boost_package_id: b.id,
          quantity: b.quantity,
          ...(b.category_id === 1
            ? { time_slots: b.timeSlots || [], days: b.days || 1 }
            : {}),
        })),
      };
      // Tạo payment
      const res = await api.post("/payments", payload);

      // Nếu có phí > 0 thì lấy QR và mock callback
      if (total > 0) {
        const instr = await axios.get(res.data.redirect_url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQrInfo(instr.data);

        await api.post("/bank/transfer/callback", {
          payment_id: res.data.payment_id,
        });
      }

      // Sau cùng: tạo post
      await handleAfterPayment(res.data.payment_id);
    } catch (err) {
      alert("Không thể khởi tạo thanh toán");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Thanh toán bài đăng
        </h2>

        <div className="mb-4 text-gray-700">
          <p>Phí cơ bản: {feeInfo.breakdown.base}đ</p>
          <p>Phí thêm: {feeInfo.breakdown.extra}đ</p>
          <p className="mt-2">
            Số dư WC hiện tại:{" "}
            <span className="font-semibold text-green-600">
              {user.coins} WC
            </span>
          </p>
          {user.coins > 0 && (
            <>
              <label className="block mt-2">Dùng WC để giảm giá:</label>
              <input
                type="number"
                min={0}
                max={user.coins}
                value={wcUsed}
                onChange={(e) =>
                  setWcUsed(Math.min(+e.target.value, user.coins))
                }
                className="border rounded px-2 py-1 w-32"
              />
              <p className="text-sm text-gray-500 mt-1">
                Tối đa: {user.coins} WC
              </p>
            </>
          )}
        </div>

        {total > 0 && !completed && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Phương thức thanh toán:
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border rounded px-2 py-1 w-64"
            >
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="momo">Momo</option>
            </select>
          </div>
        )}

        <div className="mt-6 p-4 border-2 border-yellow-400 bg-yellow-50 rounded">
          <h3 className="text-lg font-bold text-yellow-700 mb-2">
            Tăng độ hiển thị cho bài đăng
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Chọn thêm gói đẩy tin để bài đăng của bạn xuất hiện nổi bật hơn và
            tiếp cận nhiều người hơn.
          </p>
          <button
            onClick={() => setShowBoostModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            + Chọn gói đẩy tin
          </button>

          {boost && boost.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold text-blue-600">
                Bạn đã chọn {boost.length} gói boost:
              </p>
              <ul className="list-disc ml-6 text-sm text-gray-600">
                {boost.map((b) => (
                  <li key={b.id}>
                    {b.name} (x{b.quantity}) – {b.price}đ
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Tổng cộng: <span className="text-red-600">{total}đ</span>
          </p>
          {/* thiếu && !completed vì là test nên luôn hiển thị ra, thực tế người dùng thanh toán xong thì sẽ mất cái QR này */}
          {qrInfo && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <p className="font-semibold text-green-600">
                Đây là TEST: bạn KHÔNG cần chuyển tiền thật.
              </p>
              <p className="text-sm text-gray-600">
                Hệ thống đã tự động gọi callback và đánh dấu thanh toán thành
                công.
              </p>
              <p className="mt-2">
                Ngân hàng: {qrInfo.bank_name} - STK: {qrInfo.account_no}
              </p>
              <p>Số tiền: {qrInfo.amount}đ</p>
              <p>Nội dung: {qrInfo.note}</p>
              <img
                src={qrInfo.qr_code}
                alt="QR Code"
                className="mt-2 w-48 h-48"
              />
            </div>
          )}

          {!completed ? (
            <button
              onClick={handlePayment}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? "Đang xử lý..."
                : total > 0
                ? "Thanh toán"
                : "Xác nhận đăng bài"}
            </button>
          ) : (
            <div className="flex gap-4 justify-end mt-2">
              <button
                onClick={() => navigate("/profile?tab=payments")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Xem giao dịch
              </button>
              <button
                onClick={() => navigate("/manage-posts")}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Quản lý tin
              </button>
            </div>
          )}
        </div>

        {showBoostModal && (
          <BoostModal
            onClose={() => setShowBoostModal(false)}
            onSelect={(pkgs) => {
              setBoost(pkgs);
              setShowBoostModal(false);
            }}
            initialSelected={boost} // truyền lựa chọn cũ vào
          />
        )}
      </div>
      <Footer />
    </>
  );
}
