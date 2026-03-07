import { useEffect, useState } from "react";
import api from "../../utils/api";

const TIME_SLOTS = [
  "08:00-09:00",
  "09:00-10:00",
  "12:00-13:00",
  "14:00-15:00",
  "16:00-17:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
];

export default function BoostModal({
  onClose,
  onSelect,
  initialSelected = [],
}) {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState({}); // {id: {quantity, timeSlots, days}}

  useEffect(() => {
    api.get("/boost-packages").then((res) => {
      setPackages(res.data);

      // Khởi tạo selected từ initialSelected (giữ lại lựa chọn cũ)
      const initSel = {};
      initialSelected.forEach((pkg) => {
        initSel[pkg.id] = {
          quantity: pkg.quantity || 1,
          timeSlots: pkg.timeSlots || [],
          days: pkg.days || 1,
        };
      });
      setSelected(initSel);
    });
  }, [initialSelected]);

  const togglePackage = (pkg) => {
    setSelected((prev) => {
      const newSel = { ...prev };
      if (newSel[pkg.id]) {
        delete newSel[pkg.id];
      } else {
        // Nếu là gói hẹn giờ thì mặc định days=1, timeSlots=[]
        newSel[pkg.id] =
          pkg.category_id === 1
            ? { quantity: 0, timeSlots: [], days: 1 }
            : { quantity: 1 };
      }
      return newSel;
    });
  };

  const updateQuantity = (pkgId, qty) => {
    setSelected((prev) => ({
      ...prev,
      [pkgId]: { ...prev[pkgId], quantity: qty },
    }));
  };

  const toggleTimeSlot = (pkgId, slot) => {
    setSelected((prev) => {
      const sel = prev[pkgId] || { timeSlots: [], days: 1, quantity: 0 };
      const slots = sel.timeSlots.includes(slot)
        ? sel.timeSlots.filter((s) => s !== slot)
        : [...sel.timeSlots, slot];
      const quantity = slots.length * (sel.days || 1);
      return {
        ...prev,
        [pkgId]: { ...sel, timeSlots: slots, quantity },
      };
    });
  };

  const updateDays = (pkgId, days) => {
    setSelected((prev) => {
      const sel = prev[pkgId] || { timeSlots: [], days: 1, quantity: 0 };
      const quantity = (sel.timeSlots.length || 0) * days;
      return {
        ...prev,
        [pkgId]: { ...sel, days, quantity },
      };
    });
  };

  const handleConfirm = () => {
    const chosen = packages
      .filter((pkg) => selected[pkg.id])
      .map((pkg) => ({
        ...pkg,
        quantity: selected[pkg.id].quantity,
        timeSlots: selected[pkg.id].timeSlots || [],
        days: selected[pkg.id].days || 1,
      }));
    onSelect(chosen);
    onClose();
  };

  // Gom theo category
  const grouped = packages.reduce((acc, pkg) => {
    const cat = pkg.category?.name || "Khác";
    if (!acc[cat]) acc[cat] = { desc: pkg.category?.description, items: [] };
    acc[cat].items.push(pkg);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Chọn gói đẩy tin
        </h3>

        {Object.entries(grouped).map(([catName, catData]) => (
          <div key={catName} className="mb-6">
            <h4 className="text-lg font-semibold text-blue-700">{catName}</h4>
            {catData.desc && (
              <p className="text-sm text-gray-600 mb-2">{catData.desc}</p>
            )}
            <div className="grid grid-cols-1 gap-4">
              {catData.items.map((pkg) => {
                const sel = selected[pkg.id];
                return (
                  <div
                    key={pkg.id}
                    className={`border p-4 rounded cursor-pointer transition ${
                      sel ? "border-green-500 bg-green-50" : "hover:shadow"
                    }`}
                    onClick={() => togglePackage(pkg)}
                  >
                    <h5 className="font-semibold text-gray-700">{pkg.name}</h5>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                    <p className="text-sm text-gray-600">Giá: {pkg.price}đ</p>

                    {sel && pkg.category_id !== 1 && (
                      <input
                        type="number"
                        min={1}
                        value={sel.quantity}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateQuantity(pkg.id, +e.target.value)
                        }
                        className="mt-2 border rounded px-2 py-1 w-20"
                      />
                    )}

                    {sel && pkg.category_id === 1 && (
                      <div className="mt-3 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Chọn khung giờ:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <label
                              key={slot}
                              className="flex items-center gap-1"
                            >
                              <input
                                type="checkbox"
                                checked={sel.timeSlots.includes(slot)}
                                onClick={(e) => e.stopPropagation()} // chặn click lan ra card
                                onChange={() => toggleTimeSlot(pkg.id, slot)}
                              />

                              {slot}
                            </label>
                          ))}
                        </div>

                        <label className="block text-sm font-semibold text-gray-700 mt-2">
                          Số ngày:
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={sel.days}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateDays(pkg.id, +e.target.value)}
                          className="border rounded px-2 py-1 w-20"
                        />
                        <p className="text-sm text-gray-500">
                          Tổng số lần đẩy: {sel.quantity}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Đóng
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
