import { authFetch } from "../../utils/authFetch";

const getsubmissions = async () => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/`, 
            {
                method: 'GET',
            }
        );
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

export {getsubmissions};