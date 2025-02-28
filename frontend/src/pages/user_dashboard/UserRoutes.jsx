import {Routes, Route} from "react-router-dom";
import UserDashboard from "./UserDashboard";
import FormsList from "./FormsList";
import Form from "./Form";
import SubmissionsList from "./SubmissionsList";
import Submission from "./Submission";
import UserHome from "./UserHome";


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserDashboard><UserHome/></UserDashboard>}/>
            <Route path="/formslist" element={<UserDashboard><FormsList/></UserDashboard>}/>
            <Route path="/form/:formID" element={<UserDashboard><Form/></UserDashboard>}/>
            <Route path="/submissionslist" element={<UserDashboard><SubmissionsList/></UserDashboard>}/>
            <Route path="/submission/:submissionID" element={<UserDashboard><Submission/></UserDashboard>}/>
        </Routes>
    )
}

export default UserRoutes;