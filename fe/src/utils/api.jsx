import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const token = userToken ?? adminToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ====== RESPONSE INTERCEPTOR (giữ nguyên của bạn) ======
let retryCount = 0;
const MAX_RETRY = 3;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      if (retryCount < MAX_RETRY) {
        retryCount++;
        await new Promise((r) => setTimeout(r, 1000 * retryCount));
        return api(error.config);
      } else {
        alert("Bạn thao tác quá nhanh, vui lòng thử lại.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
