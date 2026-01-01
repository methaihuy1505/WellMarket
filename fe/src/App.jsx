import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpPostPage from "./pages/UpPostPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashBoard";
import ChatPage from "./components/Chat/ChatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/up-post" element={<UpPostPage />}></Route>
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </Router>
  );
}

export default App;