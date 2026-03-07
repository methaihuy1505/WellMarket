import React from "react";

export default function TitleDescription({ form, handleChange, errors, refs }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Tiêu đề & mô tả chi tiết</h2>
      <div>
        <label className="text-sm text-gray-600">Tiêu đề tin đăng *</label>
        <input
          ref={(el) => (refs.current.title = el)}
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="VD: Laptop Dell XPS 13 - i7 - 16GB"
          className={`mt-1 w-full border rounded px-3 py-2 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <label className="text-sm text-gray-600">Mô tả chi tiết *</label>
      <textarea
        ref={(el) => (refs.current.description = el)}
        rows={6}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Viết mô tả..."
        className={`mt-1 w-full border rounded px-3 py-2 ${
          errors.description ? "border-red-500" : ""
        }`}
      />
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
      )}
    </div>
  );
}
