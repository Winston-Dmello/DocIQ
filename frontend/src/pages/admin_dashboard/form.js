import { authFetch } from "../../utils/authFetch";

const getform = async (formID) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/get/${formID}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

const editform = async (formID, formName, recipients, category, submissionType, customFields) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/${formID}`, {
            method: 'PUT',
            body: JSON.stringify({"form_name":formName, "recipients":recipients, "category":category, "submission_type":submissionType, "form_data":customFields})
        });
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

export {getform, editform};