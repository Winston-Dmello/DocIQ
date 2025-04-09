import { authFetch } from "../../utils/authFetch";

const getform = async (formID) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/get/${formID}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

const submitform = async (formData) => {
    try{
        const response = await authFetch(
            `${import.meta.env.VITE_BASE_URL}/submissions/create`,
            {
                method: 'POST',
                body: formData
            }

        );
        const reply = await response.json();
        return reply;
    }catch{
        return [];
    }
}

export {getform, submitform};