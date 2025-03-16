import { authFetch } from "../../utils/authFetch";

const generateForm = async (form_name, recipients, category, submission_type, form_data) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/create`, {
            method: 'POST',
            body: JSON.stringify({
                'form_name': form_name,
                'recipients': recipients,
                'category': category,
                'submission_type': submission_type,
                'form_data': form_data
            })
        })
        if(response.ok){
            return {type: "success", message: "Success"};    
        }else{
            return {type:"error", message: "Form Name is Taken"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const getUsers = async () => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/form/users`, {
            method: 'GET',
        })
        if(response.ok){
            const users = await response.json();
            return users;
        }else{
            return {type:"error", message: "Error Fetching Users"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const getCategories = async () => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
            method: 'GET',
        })
        if(response.ok){
            const users = await response.json();
            return users;
        }else{
            return {type:"error", message: "Error Fetching Users"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

export {generateForm, getUsers, getCategories};