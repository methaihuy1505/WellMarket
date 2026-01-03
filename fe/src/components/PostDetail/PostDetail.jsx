// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import PostGallery from "./PostGallery";
import PostInfo from "./PostInfo";
import PostReview from "./PostReview";
import SimilarPosts from "./SimilarPosts";
import PostDescription from "./PostDescription";
import PostDetailInfo from "./PostDetailInfo";
import { postDetailMock } from "./postDetail.mock";
import { canReviewMock } from "./canReview.mock";
import CommentBox from "./CommentBox";

export default function PostDetail() {
    //   const { postId } = useParams(); 
    const postId = 1; //chi test nho xoa
    const [post, setPost] = useState(null);
    const [canReview, setCanReview] = useState(false);

    useEffect(() => {
        loadPost();
        checkCanReview();
    }, [postId]);

    const loadPost = async () => {
        // try {
        //     const res = await axios.get(`/posts/${postId}`);

        //     // phòng trường hợp API trả { data: {...} }
        //     const postData = res?.data?.data ?? res?.data;

        //     if (!postData) {
        //         throw new Error("Post empty");
        //     }

        //     setPost(postData);
        // } catch (err) {
        // console.warn("Load post failed → use mock", err);
        setPost(postDetailMock);
        // }
    };

    // user đã mua sản phẩm chưa?
    const checkCanReview = async () => {
        try {
            const res = await axios.get(`/orders/can-review/${postId}`);

            const can =
                res?.data === true ||
                res?.data?.data === true;

            setCanReview(can);
        } catch (err) {
            console.warn("Check canReview failed → use mock", err);
            setCanReview(canReviewMock);
        }
    };

    console.log("POST DATA =", post);

    if (!post) return null;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
                {/* TOP */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border-2 border-pink-100 rounded-lg ">
                    <PostGallery images={post.images} />
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
                            <CommentBox userId={post.userId} />
                        </div>
                    </div>
                </div>

                {canReview === true && post?.id && (
                    <PostReview postId={post.id} />
                )}

                <SimilarPosts
                    categoryId={post.category_id}
                    currentPostId={post.id}
                />
            </div>
        </div>


    );
}
