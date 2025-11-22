import Header from "./components/Layout/Header";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function App() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          phone: "0987654321",
          password: "123456",
        });

        console.log("Login success:", response.data);
        localStorage.setItem("access_token", response.data.access_token);
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
      }
    };

    login();
  }, []);

  return <h1>Đang thử đăng nhập...</h1>;
}
export default App;
