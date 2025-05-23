import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home_page/Home.jsx";
import LoginLayout from "./pages/login_layout/LoginLayout.jsx";
import UserAuth from "./pages/user_login/UserAuth";
import AdminAuth from "./pages/admin_login/AdminAuth";
import AdminRoutes from "./pages/admin_dashboard/AdminRoutes.jsx";
import UserRoutes from "./pages/user_dashboard/UserRoutes.jsx";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import GlobalSnackbar from "./utils/GlobalSnackbar.jsx";
import ResetPassword from "./pages/reset_password/ResetPassword.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route
          path="/reset-password/:token"
          element={
            <LoginLayout>
              <ResetPassword />
            </LoginLayout>
          }
        />

        <Route
          path="/login/admin"
          element={
            <LoginLayout>
              <AdminAuth />
            </LoginLayout>
          }
        />
        <Route
          path="/login/user"
          element={
            <LoginLayout>
              <UserAuth />
            </LoginLayout>
          }
        />

        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/*"
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <GlobalSnackbar />
    </>
  );
}

export default App;
