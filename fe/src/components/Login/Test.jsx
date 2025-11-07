import { LoginModal } from "./Login";
import { RegisterModal } from "./Register";
export default function Test() {
  return (
    <>
    <button
      onClick={() => LoginModal.show()}
      className="bg-pink-500 text-white px-4 py-2 rounded-lg"
    >
      Mở popup login
    </button>
     <button
      onClick={() => RegisterModal.show()}
      className="bg-pink-500 text-white px-4 py-2 rounded-lg"
    >
      Mở popup đăng ký
    </button>
    </>
  );
}
