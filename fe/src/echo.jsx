import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const userToken = localStorage.getItem("userToken");
const adminToken = localStorage.getItem("adminToken");
const token = userToken ?? adminToken;

export const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
  authEndpoint: "http://localhost:8000/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },
});
