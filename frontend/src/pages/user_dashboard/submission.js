import { authFetch } from "../../utils/authFetch";

const getsubmission = async (id) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

const deletesubmission = async (id) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`, {
            method: 'DELETE'
        });
        return response;
    }catch(error){
        console.log(error);
    }
}

export {getsubmission, deletesubmission};