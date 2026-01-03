// src/components/manage/PostActionsDropdown.jsx
import { useEffect, useRef, useState } from "react";

export default function PostActionsDropdown({
  post,
  onDelete,
  onExtend,
  onRepublish,
  onHide,
  onEdit
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // click outside → close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-xl px-2 hover:bg-gray-100 rounded"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border rounded shadow z-20">
          {/* ACTIVE → ẨN TIN */}
          {post.post_status === "active" && (
            <DropdownItem
              label="Ẩn tin"
              onClick={() => {
                onHide?.(post);
                close();
              }}
            />
          )}

          {/* HIDDEN → SỬA / HIỆN LẠI / XÓA */}
          {post.post_status === "hidden" && (
            <>
              <DropdownItem
                label="Sửa tin"
                onClick={() => {
                  onEdit?.(post);
                  close();
                }}
              />
              <DropdownItem
                label="Hiện lại"
                onClick={() => {
                  onRepublish?.(post);
                  close();
                }}
              />
              <DropdownItem
                label="🗑 Xóa tin"
                danger
                onClick={() => {
                  onDelete?.(post);
                  close();
                }}
              />
            </>
          )}

          {/* WAITING / REJECTED → SỬA / XÓA */}
          {(post.post_status === "waiting_approval" ||
            post.post_status === "rejected") && (
            <>
              <DropdownItem
                label="Sửa tin"
                onClick={() => {
                  onEdit?.(post);
                  close();
                }}
              />
              <DropdownItem
                label="🗑 Xóa tin"
                danger
                onClick={() => {
                  onDelete?.(post);
                  close();
                }}
              />
            </>
          )}

          {/* NEED EXTEND */}
          {post.post_status === "need_to_extend" && (
            <>
              <DropdownItem
                label="Gia hạn"
                onClick={() => {
                  onExtend?.(post);
                  close();
                }}
              />
              <DropdownItem
                label="🗑 Xóa tin"
                danger
                onClick={() => {
                  onDelete?.(post);
                  close();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100
        ${danger ? "text-red-500 hover:bg-red-50" : ""}`}
    >
      {label}
    </button>
  );
}
