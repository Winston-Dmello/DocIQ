const generateForm = async (form_name, recipients, category, submission_type, form_data) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/form/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'form_name': form_name,
                'recipients': recipients,
                'category': category,
                'submission_type': submission_type,
                'form_data': form_data
            })
        })
        if(response.ok){
            console.log(response)
            console.log("worked");
            return {type: "success", message: "Success"};    
        }else{
            console.log(response);
            return {type:"error", message: "Form Name is Taken"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

const getUsers = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/form/users`, {
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

export {generateForm, getUsers};