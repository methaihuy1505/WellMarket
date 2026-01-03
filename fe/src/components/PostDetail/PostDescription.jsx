import { useState } from "react";
import { postDescriptionMock } from "./postDescription.mock";


export default function PostDescription({ post }) {
    const [expanded, setExpanded] = useState(false);

    const text =
        post?.description ??
        postDescriptionMock.description;

    return (
        <div className="bg-white border-2 border-pink-100 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Mô tả chi tiết</h2>

            {/* TEXT WRAPPER – KHÔNG overflow */}
            <div className="text-sm text-gray-700 whitespace-pre-line">
                {/* INNER CLAMP */}
                <div className="relative">
                    <div className={!expanded ? "max-h-28 overflow-hidden" : ""}>
                        {text}
                    </div>

                    {!expanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white" />
                    )}
                </div>

                {post?.phone && (
                    <div className="mt-3">
                        <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                            SDT liên hệ: {post.phone}
                        </span>
                    </div>
                )}
            </div>

            <div className="text-center mt-1">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-sm text-gray-500 hover:underline hover:text-pink-500"
                >
                    {expanded ? "Thu gọn ▲" : "Xem thêm ▼"}
                </button>
            </div>
        </div>
    );
}
