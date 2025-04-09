import { Routes, Route } from "react-router-dom";
import AdminForms from "./AdminForms";
import GenerateForm from "./GenerateForm";
import AdminDashboard from "./AdminDashboard";
import SubmissionsList from "./SubmissionsList";
import Submission from "./Submission";
import DocumentsList from "./DocumentsList";
import CreateUser from "./CreateUser";
import UsersList from "./UsersList";
import CategoriesList from "./CategoriesList";
import DivisionsList from "./DivisionsList";
import Form from "./Form";
import EditForm from "./EditForm";
import AdminHome from "./AdminHome";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard><AdminHome/></AdminDashboard>}/>
            <Route path="/generate-form" element={<AdminDashboard><GenerateForm/></AdminDashboard>}/>
            <Route path="/forms" element={<AdminDashboard><AdminForms/></AdminDashboard>}/>
            <Route path="/forms/:formID" element={<AdminDashboard><Form/></AdminDashboard>}/>
            <Route path="/forms/edit/:formID" element={<AdminDashboard><EditForm/></AdminDashboard>}/>
            <Route path="/submissions" element={<AdminDashboard><SubmissionsList/></AdminDashboard>}/>
            <Route path="/submissions/:submissionID" element={<AdminDashboard><Submission/></AdminDashboard>}/>
            <Route path="/documents" element={<AdminDashboard><DocumentsList/></AdminDashboard>}/>
            <Route path="/users" element ={<AdminDashboard><UsersList/></AdminDashboard>}/>
            <Route path="/user/create" element={<AdminDashboard><CreateUser/></AdminDashboard>}/>
            <Route path="/categories" element={<AdminDashboard><CategoriesList/></AdminDashboard>}/>
            <Route path="/divisions" element={<AdminDashboard><DivisionsList/></AdminDashboard>}/>
        </Routes>
    )
}

export default AdminRoutes;
