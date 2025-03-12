const getCategories = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            return {type: "success", message: "Success"};    
        }else{
            console.log(response);
            return {type:"error", message: "Category Already Exists"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const deleteCategory = async (category_id) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories/${category_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            return {type: "success", message: "Deleted"};
        }else{
            console.log(response);
            return {type: "error", message: "Something went Wrong"};
        }
    }catch{
        return {type: "error", message: "Something went Wrong"};
    }
}

export {getCategories, createCategory, deleteCategory};