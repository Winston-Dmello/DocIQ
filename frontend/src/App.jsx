import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home_page/Home.jsx"
import LoginLayout from "./pages/login_layout/LoginLayout.jsx";
import UserAuth from "./pages/user_login/UserAuth";
import AdminAuth from "./pages/admin_login/AdminAuth";
import DashboardLayout from "./pages/dashboard_layout/DashboardLayout.jsx";
import UserHome from "./pages/user_dashboard/UserHome";
import GenerateForm from "./pages/form_generator/GenerateForm.jsx";
import AdminForms from "./pages/admin_forms/AdminForms.jsx";
import FormsList from "./pages/user_dashboard/FormsList.jsx";
import Forms from "./pages/user_dashboard/Form.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login/admin" element={<LoginLayout><AdminAuth/></LoginLayout>}/>
        <Route path="/login/user" element={<LoginLayout><UserAuth/></LoginLayout>}/>
        <Route path="/user/dashboard" element={<DashboardLayout><UserHome/></DashboardLayout>}/>
        <Route path="/user/dashboard/formlist" element={<DashboardLayout><FormsList/></DashboardLayout>}/>
        <Route path="/user/dashboard/form" element={<DashboardLayout><Forms/></DashboardLayout>}/>

        <Route path="/admin/dashboard/" element={<DashboardLayout><AdminForms/></DashboardLayout>}/>
        <Route path="/admin/dashboard/generate-form" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="*" element={<Navigate to="/home" replace />}/> 
      </Routes>
    </>
  )
}

export default App;
