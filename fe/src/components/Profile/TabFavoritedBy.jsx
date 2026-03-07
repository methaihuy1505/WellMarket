export default function TabFavoritedBy({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">💔</div>
        <p className="text-gray-500">Chưa có ai yêu thích bạn.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Người yêu thích tôi
      </h2>
      <div className="space-y-3">
        {data.map((item) => {
          const user = item.user;
          if (!user) return null;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-full h-full object-cover"
                    alt={user.name}
                  />
                ) : (
                  user.name?.charAt(0)
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Đã thích vào:{" "}
                  {new Date(item.created_at).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
