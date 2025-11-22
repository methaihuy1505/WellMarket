export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
       

        {/* COLUMN 2 – Support */}
        <div>
          <h3 className="font-semibold mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-black cursor-pointer">Trung tâm trợ giúp</li>
            <li className="hover:text-black cursor-pointer">An toàn mua bán</li>
            <li className="hover:text-black cursor-pointer">Liên hệ hỗ trợ</li>
          </ul>
        </div>

        {/* COLUMN 3 – About */}
        <div>
          <h3 className="font-semibold mb-4">Về WellMarket</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-black cursor-pointer">Giới thiệu</li>
            <li className="hover:text-black cursor-pointer">Quy chế hoạt động sàn</li>
            <li className="hover:text-black cursor-pointer">Chính sách bảo mật</li>
            <li className="hover:text-black cursor-pointer">Giải quyết tranh chấp</li>
            <li className="hover:text-black cursor-pointer">Tuyển dụng</li>
            <li className="hover:text-black cursor-pointer">Truyền thông</li>
            <li className="hover:text-black cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* COLUMN 4 – Social + Contact */}
        <div>
          <h3 className="font-semibold mb-4">Liên kết</h3>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-700 text-white w-8 h-8 rounded flex items-center justify-center text-lg cursor-pointer">
              in
            </div>
            <div className="bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center text-lg cursor-pointer">
              ▶
            </div>
            <div className="bg-blue-500 text-white w-8 h-8 rounded flex items-center justify-center text-lg cursor-pointer">
              f
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-2">
            Email: trogiup@WellMarket.vn
          </p>
          
          <p className="text-gray-700 text-sm">
            Địa chỉ: 180 Cao Lỗ, Phường Chánh Hưng, Tp. Hồ Chí Minh
          </p>
        </div>
      </div>
    </footer>
  );
}
