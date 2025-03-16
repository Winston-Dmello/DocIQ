import { authFetch } from "../../utils/authFetch";

const getsubmission = async (id) => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

const approveSubmission = async (id, status, reason = "Ok") => {
    try{
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/submissions/approve`, {
            method: 'PUT',
            body: JSON.stringify({
                'submission_id': id,
                'status': status,
                'reason': reason
            })
        })
        if(response.ok){
            return {type: "success", message: "Done"};    
        }else{
            return {type:"error", message: "Error"};    
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}   

export {getsubmission, approveSubmission};