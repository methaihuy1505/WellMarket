// src/components/Admin/PostsManager/PendingPostsTable.jsx
import React from "react";
import { fmtDate } from "../../../utils/utils";

export default function PendingPostsTable({ posts, onView, onApprove, onReject }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Người đăng</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td>{p.id}</td>
              <td className="max-w-xs truncate" title={p.title}>{p.title}</td>
              <td className="text-pink-600">{Number(p.price).toLocaleString()} đ</td>
              <td>{p.author}</td>
              <td>{fmtDate(p.created_at)}</td>
              <td className="flex gap-2">
                <button onClick={() => onView(p.id)} className="text-gray-500 hover:text-black">
                    Chi tiết
                </button>
                <button 
                    onClick={() => onApprove(p.id)} 
                    className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                >
                    Duyệt
                </button>
                <button 
                    onClick={() => onReject(p.id)} 
                    className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                    Từ chối
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">Không có bài chờ duyệt</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}