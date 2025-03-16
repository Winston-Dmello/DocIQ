import { authFetch } from "../../utils/authFetch";

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


const createCategory = async (data) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        if(response.ok){
            return {type: "success", message: "Success"};    
        }else{
            return {type:"error", message: "Category Already Exists"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const deleteCategory = async (category_id) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/categories/${category_id}`, {
            method: 'DELETE',
        })
        if(response.ok){
            return {type: "success", message: "Deleted"};
        }else{
            return {type: "error", message: "Something went Wrong"};
        }
    }catch{
        return {type: "error", message: "Something went Wrong"};
    }
}

export {getCategories, createCategory, deleteCategory};