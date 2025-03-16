import { authFetch } from "../../utils/authFetch";

const getDocuments = async () => {
    try {
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/documents`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getFilePath = async (file_path) => {
    try {
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/documents/getURL`, {
            method: 'POST',
            body: JSON.stringify({"file_path":file_path})
        
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export {getDocuments, getFilePath};