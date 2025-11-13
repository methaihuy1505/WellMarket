import { LoginModal } from "../Login/Login";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm">
            {/* LEFT */}
            <div className="flex items-center space-x-4 shrink-0">
                {/* Logo */}
                <p className="text-3xl font-medium font-italic">WellMarket</p>

                {/* Location */}
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
                    <span className="text-xl font-medium">Quận 1</span>
                    <span className="text-md">▼</span>
                </div>
            </div>

            {/* CENTER - Search */}
            <div className="flex-grow px-6 ">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full hover:ring-1 
                                border-gray-300 hover:ring-pink-300  
                                hover:shadow-lg hover:shadow-pink-200
                                 ">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="bg-transparent w-full text-xl outline-none px-2  
                                    
                        
                        "
                    />
                    <button className="p-1 rounded-full flex items-center justify-center w-7 h-7">
                        <img src="./src\assets\search.png" alt="" className="w-8 h-7" />
                    </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center space-x-3 shrink-0">
                <button className="text-4xl text-gray-600 border-gray-300 hover:ring-1 hover:ring-pink-300  
                                hover:shadow-lg hover:shadow-pink-200 rounded-full w-12 h-11">
                    <img src="src\assets\heart.png" alt="" className="rounded-full" /></button>
                <button className="text-xl text-gray-600 border-gray-300 hover:ring-1 hover:ring-pink-300  
                                hover:shadow-lg hover:shadow-pink-200 rounded-full w-12 h-11">
                    <img src="src\assets\message.png" alt="" className="rounded-full" /></button>
                <button className="text-xl text-gray-600 border-gray-300 hover:ring-1 hover:ring-pink-300  
                                hover:shadow-lg hover:shadow-pink-200 rounded-full w-12 h-11"> 
                                <img src="src\assets\notificaion.png" alt="" className="rounded-full" /></button>

                <button
                    onClick={() => LoginModal.show()}
                    className="text-xl border px-3 py-1 rounded-full hover:bg-gray-100 text-gray-700"
                >
                    Đăng nhập
                </button>

                <button
                    onClick={() => alert("Đăng tin")}
                    className="text-xl bg-yellow-400 text-black px-4 py-1 rounded-full font-medium hover:bg-yellow-500"
                >
                    Đăng tin
                </button>

                <div className="flex items-center space-x-1 border px-2 py-1 rounded-full cursor-pointer hover:bg-gray-100 text-gray-700">
                    <span className="text-xl">👤</span>
                    <span className="text-xs">▼</span>
                </div>
            </div>
        </header>

    );
}
