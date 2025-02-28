import { Routes, Route } from "react-router-dom";
import AdminForms from "./AdminForms";
import GenerateForm from "./GenerateForm";
import AdminDashboard from "./AdminDashboard";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard><AdminForms/></AdminDashboard>}/>
            <Route path="/generate-form" element={<AdminDashboard><GenerateForm/></AdminDashboard>}/>
            <Route path="/forms" element={<AdminDashboard><AdminForms/></AdminDashboard>}/>
        </Routes>
    )
}

export default AdminRoutes;
