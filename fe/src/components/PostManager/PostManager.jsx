// src/pages/ManagePosts.jsx
import { useState, useMemo } from "react";
import { postsMock } from "./PostManager.hehehe.mock";
import PostItem from "./PostItem";

const TABS = [
    { key: "active", label: "Đang hiển thị" },
    { key: "hidden", label: "Đã ẩn" },
    { key: "waiting_approval", label: "Chờ duyệt" },
    { key: "rejected", label: "Bị từ chối" },
    { key: "need_to_extend", label: "Cần gia hạn" }
];

export default function ManagePosts() {
    const [activeTab, setActiveTab] = useState("active");
    const [posts, setPosts] = useState(postsMock);
    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    // ✅ FILTER ĐÚNG: tab + search
    const filteredPosts = useMemo(() => {
        return posts.filter((p) => {
            const matchStatus = p.post_status === activeTab;

            const matchSearch =
                p.title?.toLowerCase().includes(search.toLowerCase());

            return matchStatus && matchSearch;
        });
    }, [posts, activeTab, search]);

    /* ACTION HANDLERS */
    const handleDelete = (post) => {
        if (confirm("Xóa tin này?")) {
            setPosts((prev) => prev.filter((p) => p.id !== post.id));
        }
    };

    const handleExtend = (post) => {
        alert("Gia hạn tin: " + post.title);
    };

    const handleRepublish = (post) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === post.id ? { ...p, post_status: "active" } : p
            )
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/*  SEARCH */}
            {/*  SEARCH – dùng chung cho tất cả tab */}
            <div className="flex justify-end mb-4">
                <div
                    className={`
      relative w-80 flex items-center
      bg-gray-100 rounded-full px-4 py-2
      transition-all duration-200
      ${searchOpen ? "ring-2 ring-pink-200 shadow-md" : ""}
    `}
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setSearchOpen(true)}
                        onBlur={() => setSearchOpen(false)}
                        placeholder="Tìm tin đăng của bạn..."
                        className="
        bg-transparent outline-none w-full text-sm
        placeholder-gray-400
      "
                    />
                </div>
            </div>


            {/* TABS */}
            <div className="flex border-b mb-4">
                {TABS.map((tab) => {
                    const count = posts.filter(
                        (p) => p.post_status === tab.key
                    ).length;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
          flex-1 text-center py-3 text-sm font-medium transition-all duration-200
          ${activeTab === tab.key
                                    ? "text-pink-500 border-b-2 border-pink-500 font-medium text-black"
                                    : "text-gray-500 hover:text-gray-700"
                                }
        `}
                        >
                            {tab.label} ({count})
                        </button>
                    );
                })}
            </div>


            {/* CONTENT */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <img
                        src="/empty-state.png"
                        className="mx-auto mb-4 w-40"
                    />
                    <div className="font-semibold">
                        Không tìm thấy tin đăng
                    </div>
                    <div className="text-sm mt-1">
                        Không có tin phù hợp với bộ lọc hiện tại
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            onDelete={handleDelete}
                            onExtend={handleExtend}
                            onRepublish={handleRepublish}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
