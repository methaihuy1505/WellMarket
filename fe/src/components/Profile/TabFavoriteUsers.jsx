export default function TabFavoriteUsers({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">😶</div>
        <p className="text-gray-500">Bạn chưa yêu thích ai.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Tôi đã yêu thích</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => {
          // FIX API: Quan hệ với người mình like
          // Laravel trả về snake_case cho quan hệ: target_user
          const targetUser = item.target_user || item.targetUser;
          if (!targetUser) return null;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-4 border rounded-xl hover:border-pink-300 transition-colors cursor-pointer bg-white"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                {targetUser.avatar ? (
                  <img
                    src={targetUser.avatar}
                    className="w-full h-full object-cover"
                    alt="avt"
                  />
                ) : (
                  targetUser.name?.charAt(0)
                )}
              </div>
              <span className="font-medium text-gray-700">
                {targetUser.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
