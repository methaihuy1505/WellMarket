// src/components/manage/PostItem.jsx
import PostActionsDropdown from "./PostActionsDropdown";

export default function PostItem({ post, onDelete, onExtend, onRepublish }) {
    return (
        <div className="flex gap-4 border rounded-lg p-3 bg-white">
            {/* IMAGE */}
            <div className="w-32 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                    src={post.images?.[0] || "/no-image.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* INFO */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-sm line-clamp-2">
                        {post.title}
                    </h3>

                    <div className="text-xs text-gray-500 mt-1">
                        {post.category_name} · {post.product_name}
                    </div>

                    <div className="text-red-500 font-bold mt-1">
                        {post.price?.toLocaleString()} đ
                    </div>

                    <div className="text-xs text-gray-400 mt-1 flex gap-3">
                        <span>{post.location}</span>
                        <span>{post.views} lượt xem</span>
                        <span>{post.created_at}</span>
                    </div>

                    {post.post_status === "rejected" && (
                        <div className="text-xs text-red-500 mt-1">
                            {post.reject_reason}
                        </div>
                    )}
                </div>

                {/* ACTIONS – CHỈ 1 DROPDOWN */}
                <div className="flex justify-end mt-2">
                    <PostActionsDropdown
                        post={post}
                        onHide={(p) => console.log("Ẩn", p)}
                        onEdit={(p) => navigate(`/posts/${p.id}/edit`)}
                        onRepublish={(p) => console.log("Hiện lại", p)}
                        onExtend={(p) => console.log("Gia hạn", p)}
                        onDelete={(p) => console.log("Xóa", p)}
                    />
                </div>
            </div>
        </div>
    );
}
