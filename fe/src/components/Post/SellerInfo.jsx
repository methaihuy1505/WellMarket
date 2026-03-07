import React from "react";

export default function SellerInfo({ form, handleChange, errors, refs }) {
  return (
    <>
      <div>
        <label className="text-sm text-gray-600">Địa chỉ *</label>
        <input
          ref={(el) => (refs.current.address = el)}
          type="text"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="VD: Phường 5, Quận 10, TP.HCM"
          className={`mt-1 w-full border rounded px-3 py-2 ${
            errors.address ? "border-red-500" : ""
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>
    </>
  );
}
