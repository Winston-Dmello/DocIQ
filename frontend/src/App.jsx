import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home_page/Home.jsx";
import LoginLayout from "./pages/login_layout/LoginLayout.jsx";
import UserAuth from "./pages/user_login/UserAuth";
import AdminAuth from "./pages/admin_login/AdminAuth";
import AdminRoutes from "./pages/admin_dashboard/AdminRoutes.jsx";
import UserRoutes from "./pages/user_dashboard/UserRoutes.jsx";
import { JWTProvider } from "./contexts/jwtcontext.jsx";

function App() {
  return (
    <JWTProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        
        <Route path="/login/admin" element={<LoginLayout><AdminAuth /></LoginLayout>} />
        <Route path="/login/user" element={<LoginLayout><UserAuth /></LoginLayout>} />

        <Route path="/admin/dashboard/*" element={<AdminRoutes />} />
        <Route path="/user/dashboard/*" element={<UserRoutes />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </JWTProvider>
  );
}

export default App;
