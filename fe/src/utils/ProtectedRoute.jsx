import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ProtectedRoute({ children }) {
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  // Nếu chưa đăng nhập mà vào trang profile → /
  if (!userToken && !adminToken && location.pathname.startsWith("/profile")) {
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập mà vào trang admin → admin-login
  if (!adminToken && location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
export default ProtectedRoute;
