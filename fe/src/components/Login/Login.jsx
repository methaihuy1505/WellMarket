

export default function LoginForm() {
  return (
    <div className="fixed inset-0 bg-black-40 max-h-screen flex items-center justify-center z-50">
      <div className="bg-red-950 rounded-xl shadow-md w-[360px] p-6 relative animate-fade-in">

        <h2 className="text-center text-lg font-semibold mb-4">
          Đăng nhập / Đăng ký
        </h2>

        <button className="w-full flex items-center justify-center border rounded-full py-2 hover:bg-gray-100 mb-2">
          <img
            src="src\assets\g.webp=s48-fcrop64=1,00000000ffffffff-rw"
            className="w-24 h-5 mr-2"
            alt="Google"
          />
          Tiếp tục với Google
        </button>
        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Hoặc</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-200 mb-3"
        />

        <button className="w-full bg-pink-100 text-gray-600 rounded-lg py-2 font-medium hover:bg-pink-200">
          Tiếp tục
        </button>

        <div className="text-center text-xs text-gray-500 space-x-3 mt-4">
          <a href="#" className="hover:underline">
            Quy chế hoạt động sàn
          </a>
          <a href="#" className="hover:underline">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:underline">
            Liên hệ hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}