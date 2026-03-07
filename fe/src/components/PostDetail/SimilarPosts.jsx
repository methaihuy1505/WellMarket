import PostCard from "../Layout/PostCard";
import { useEffect, useState } from "react";
import api from "../../utils/api";
export default function SimilarPosts({ categoryId, currentPostId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadSimilar();
  }, [categoryId, currentPostId]);

  const loadSimilar = async () => {
    try {
      const res = await api.get("/posts", {
        params: { category: categoryId }, // backend đang nhận param "category"
      });
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      if (!list.length) return setPosts([]);
      const filtered = list.filter((p) => p.id !== currentPostId).slice(0, 24);
      setPosts(filtered);
    } catch (err) {
      console.warn("Load similar posts failed", err);
      setPosts([]);
    }
  };

  if (!posts || posts.length === 0) return null;

  return (
    <div>
      <h2 className="font-semibold mb-3">Tin đăng tương tự</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {posts.map((item, idx) => (
          <PostCard key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}
