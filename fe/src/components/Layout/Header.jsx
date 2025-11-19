import { LoginModal } from "../Login/Login";
import UserMenu from "./Header_userDropDown";
export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm">
            {/* LEFT */}
            <div className="flex items-center space-x-4 shrink-0">
                {/* Logo */}
                <p className="text-2xl font-medium font-italic">WellMarket</p>

                {/* Location */}
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
                    <span className="text-md font-medium">Quận 1</span>
                    <span className="text-sm">▼</span>
                </div>
            </div>

            {/* CENTER - Search */}
            <div className="flex-grow px-9 ">
                <div className="flex items-center bg-gray-100 rounded-full pl-3  w-full
                                 ">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="bg-transparent w-full text-md outline-none px-2  
                                    
                        
                        "
                    />
                    <button className="p-2  rounded-full flex items-center justify-center w-10 h-10 hover:bg-gray-300
                                        hover:ring-2 hover:ring-pink-300 hover:shadow-lg hover:shadow-pink-200 rounded-full
                    ">
                        <img src="./src\assets\search.png" alt="" className="w-6 h-5" />
                    </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center space-x-3 shrink-0">
                <button className="text-3xl text-gray-600 border-gray-300  
                                hover:shadow-xl hover:shadow-gray-500 rounded-full w-10 h-9">
                    <img src="src\assets\heart.png" alt="" className="rounded-full" /></button>
                <button className="text-xl text-gray-600 border-gray-300  
                                hover:shadow-xl hover:shadow-gray-500 rounded-full w-10 h-9 flex items-center justify-center">
                    <img src="src\assets\message.png" alt="" className="rounded-full" /></button>
                <button className="text-md text-gray-600 border-gray-300 
                                hover:shadow-xl hover:shadow-gray-500 rounded-full w-10 h-9"> 
                                <img src="src\assets\notificaion.png" alt="" className="rounded-full" /></button>

                <button
                    onClick={() => LoginModal.show()}
                    className="text-md border px-3 py-1 rounded-full hover:bg-gray-100 text-gray-700"
                >
                    Đăng nhập
                </button>

                <button
                    onClick={() => alert("Đăng tin")}
                    className="text-md bg-pink-400 text-black px-4 py-1 rounded-full font-medium hover:bg-pink-500"
                >
                    Đăng tin
                </button>
                    <UserMenu />
            </div>
        </header>

    );
}
