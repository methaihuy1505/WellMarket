import PostCard from "./PostCard";

export default function PostGrid({ posts, meta, onLoadMore }) {
  return (
    <div className="w-full mt-6">
      {/* --- LOADING STATE (SKELETON) --- */}
      {posts === null && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-100 p-2 space-y-3 animate-pulse shadow-sm"
            >
              {/* Image skeleton */}
              <div className="h-40 bg-gray-200 rounded-md w-full"></div>
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              {/* Price skeleton */}
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              {/* Footer skeleton */}
              <div className="flex justify-between pt-2">
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {posts && posts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="text-6xl mb-4 opacity-50">🔍</div>
          <h3 className="text-gray-800 text-xl font-semibold">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Rất tiếc, chúng tôi không tìm thấy kết quả phù hợp với lựa chọn của
            bạn. Hãy thử thay đổi từ khóa hoặc bộ lọc.
          </p>
        </div>
      )}

      {/* --- DATA STATE --- */}
      {posts && posts.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {posts.map((item, idx) => (
              <PostCard key={item.id} item={item} idx={idx} />
            ))}
          </div>

          {meta && meta.current_page < meta.last_page && (
            <div className="flex justify-center mt-10">
              <button
                onClick={onLoadMore}
                className="px-8 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm hover:shadow-md hover:border-pink-500 hover:text-pink-600 transition-all transform active:scale-95"
              >
                Xem thêm sản phẩm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
