import ReactDOM from "react-dom/client";
import Register from "./Register";
import { LoginModal } from "../Login/Login";

export const RegisterModal = {
  show() {
    console.log("RegisterModal.show() called");

    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = ReactDOM.createRoot(modalRoot);

    const close = () => {
      root.unmount();
      document.body.removeChild(modalRoot);
    };

    root.render(
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
        <div
          className="bg-white rounded-xl shadow-md w-[400px] p-6 relative animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-lg font-semibold mb-4">
            Đăng ký tài khoản
          </h2>

          <Register
            onSuccess={() => {
              close();          // đóng Register
              LoginModal.show(); // mở lại Login
            }}
          />

          <button
            onClick={close}
            className="absolute top-3 right-3 font-semibold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>
    );
  },
};
