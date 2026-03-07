// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import PostGallery from "../components/PostDetail/PostGallery";
import PostInfo from "../components/PostDetail/PostInfo";
import PostReview from "../components/PostDetail/PostReview";
import SimilarPosts from "../components/PostDetail/SimilarPosts";
import PostDescription from "../components/PostDetail/PostDescription";
import PostDetailInfo from "../components/PostDetail/PostDetailInfo";
import CommentBox from "../components/PostDetail/CommentBox";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    loadPost();
    checkCanReview();
  }, [postId]);

  const loadPost = async () => {
    try {
      const res = await api.get(`/posts/${postId}`);
      const postData = res.data;
      if (!postData) throw new Error("Post empty");
      setPost(postData);
    } catch (err) {
      console.warn("Load post failed", err);
    }
  };

  const checkCanReview = async () => {
    try {
      const res = await api.get(`/orders/can-review/${postId}`);
      const can = res.data === true || res.data?.data === true;
      setCanReview(can);
    } catch (err) {
      console.warn("Check canReview failed", err);
    }
  };

  if (!post) return null;

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
          {/* TOP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6">
            {/* Nếu backend trả về post.images thì dùng, nếu không thì fallback */}
            <PostGallery medias={post.medias} />

            <PostInfo post={post} />
          </div>

          {/* BODY */}
          <div className="flex gap-6 items-start">
            {/* LEFT */}
            <div className="flex-1 space-y-6">
              <PostDescription post={post} />
              <PostDetailInfo post={post} />
            </div>

            {/* RIGHT */}
            <div className="w-[340px] self-stretch">
              <div className="sticky top-4">
                {/* sửa userId -> user_id */}

                <CommentBox userId={post.user_id} postId={post.id} />
              </div>
            </div>
          </div>

          {canReview && post.id && <PostReview postId={post.id} />}

          <SimilarPosts categoryId={post.category_id} currentPostId={post.id} />
        </div>
      </div>
      <Footer />
    </>
  );
}
