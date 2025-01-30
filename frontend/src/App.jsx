import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home_page/Home.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginLayout from "./pages/user_layout/LoginLayout.jsx";
import UserAuth from "./pages/user_login/UserAuth";
import AdminAuth from "./pages/admin_login/AdminAuth";
import DashboardLayout from "./pages/dashboard_layout/DashboardLayout.jsx";
import UserHome from "./pages/user_home/UserHome";
import GenerateForm from "./pages/form_generator/GenerateForm.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login/admin" element={<LoginLayout><AdminAuth/></LoginLayout>}/>
        <Route path="/login/user" element={<LoginLayout><UserAuth/></LoginLayout>}/>
        <Route path="/user/dashboard" element={<DashboardLayout><UserHome/></DashboardLayout>}/>
        <Route path="/admin/dashboard" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="/admin/dashboard/generate-form" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="*" element={<Navigate to="/home" replace />}/> 
      </Routes>
    </>
  )
}

export default App;
