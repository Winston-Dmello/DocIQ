import { authFetch } from "../../utils/authFetch";

const getsubmissions = async () => {
    try{
        const userID = localStorage.getItem("UserID");
        console.log(userID);
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/user/${userID}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

export {getsubmissions};