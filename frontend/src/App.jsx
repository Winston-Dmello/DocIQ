import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./pages/NotFound";
import LoginLayout from "./pages/LoginLayout";
import UserAuth from "./pages/user_login/UserAuth";
import AdminAuth from "./pages/admin_login/AdminAuth";
import GenerateForm from "./pages/form_generator/GenerateForm";
import DashboardLayout from "./pages/DashboardLayout";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/login/admin" element={<LoginLayout><AdminAuth/></LoginLayout>}/>
        <Route path="/login/user" element={<LoginLayout><UserAuth/></LoginLayout>}/>
        <Route path="/user/dashboard" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="/admin/dashboard" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="/admin/dashboard/generate-form" element={<DashboardLayout><GenerateForm/></DashboardLayout>}/>
        <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </>
  )
}

export default App;
