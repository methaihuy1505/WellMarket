import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 > Date.now();
}

// interceptor chung
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axios;
