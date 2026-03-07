import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpPostPage from "./pages/UpPostPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashBoard from "./pages/AdminDashBoard";
import { UserProvider } from "./contexts/UserContext";
import CheckoutPage from "./pages/CheckoutPage";
import PostDetailPage from "./pages/PostDetailPage";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/subcategory/:subcategoryId" element={<SubCategoryPage />} />
          <Route path="/up-post" element={<UpPostPage />}></Route>

          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
