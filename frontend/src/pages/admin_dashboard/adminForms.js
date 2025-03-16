import { authFetch } from "../../utils/authFetch";

const getforms = async () => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/get`, {
            method: 'GET'
        });
        const data = await response.json();
        return data.forms;
    }catch{
        return [];
    }
}

export {getforms};