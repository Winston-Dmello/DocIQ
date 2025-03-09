import { Routes, Route } from "react-router-dom";
import AdminForms from "./AdminForms";
import GenerateForm from "./GenerateForm";
import AdminDashboard from "./AdminDashboard";
import SubmissionsList from "./SubmissionsList";
import Submission from "./Submission";
import DocumentsList from "./DocumentsList";
import CreateUser from "./CreateUser";
import UsersList from "./UsersList";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard><AdminForms/></AdminDashboard>}/>
            <Route path="/generate-form" element={<AdminDashboard><GenerateForm/></AdminDashboard>}/>
            <Route path="/forms" element={<AdminDashboard><AdminForms/></AdminDashboard>}/>
            <Route path="/submissions" element={<AdminDashboard><SubmissionsList/></AdminDashboard>}/>
            <Route path="/submissions/:submissionID" element={<AdminDashboard><Submission/></AdminDashboard>}/>
            <Route path="/documents" element={<AdminDashboard><DocumentsList/></AdminDashboard>}/>
            <Route path="/users" element ={<AdminDashboard><UsersList/></AdminDashboard>}/>
            <Route path="/user/create" element={<AdminDashboard><CreateUser/></AdminDashboard>}/>
        </Routes>
    )
}

export default AdminRoutes;
