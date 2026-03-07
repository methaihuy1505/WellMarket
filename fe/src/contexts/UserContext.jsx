import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const initialUser = {
  id: null, // thêm id để dùng cho receiverId logic
  name: "",
  phone: "",
  email: "",
  avatar: null,
  avatarText: "U",
  favorites: 0,
  favorite_users: 0,
  coins: 0,
  avatar_key: null,
  created_at: null,
};

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    const token = userToken ?? adminToken;

    if (!token) return;

    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUser({
          id: data.id, // lấy id từ API profile
          name: data.name,
          phone: data.phone,
          email: data.email,
          avatar: data.avatar || null,
          avatarText: data.name?.[0]?.toUpperCase() || "U",
          favorites: data.favorites || 0,
          favorite_users: data.favorite_users || 0,
          coins: data.coins || 0,
          avatar_key: data.avatar_key || null,
          created_at: data.created_at || null,
        });
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
