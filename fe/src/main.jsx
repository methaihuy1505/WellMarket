import { StrictMode, use } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

//interceptor
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      if (window.location.pathname.startsWith("/admin")) {
        // đang ở trang admin
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
      } else {
        // đang ở trang user
        localStorage.removeItem("userToken");
        localStorage.removeItem("adminToken");
        window.location.href = "/";
      }
      return Promise.reject(err);
    }
  }
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* // <GoogleOAuthProvider clientId="525477380687-iompqaf0k89kdhrmhik1uuvnac8nm89f.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
);
