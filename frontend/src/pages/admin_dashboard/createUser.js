import { authFetch } from "../../utils/authFetch";

const createUser = async (data) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/users`, {
            method: 'GET',
            body: JSON.stringify(data)
        });
        if(response.ok){
            return {type: "success", message: "Success"};    
        }else{
            const res = await response.json();
            console.log(res.errors);
            // console.log(response);
            return {type:"error", message: "User Email Already in Use"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const getDivisions = async () => {
    try {
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'GET',
        });
        if (response.ok) {
            const divisions = await response.json();
            return divisions;
        } else {
            return { type: "error", message: "Error Fetching Divisions" };
        }
    } catch {
        return { type: "error", message: "Error Connecting to Server" };
    }
};

export {createUser, getDivisions};
