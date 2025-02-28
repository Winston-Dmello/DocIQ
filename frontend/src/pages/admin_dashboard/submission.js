const getsubmission = async (id) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

const approveSubmission = async (id, status, reason = "Ok") => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'submission_id': id,
                'status': status,
                'reason': reason
            })
        })
        if(response.ok){
            console.log(response)
            console.log("worked");
            return {type: "success", message: "Done"};    
        }else{
            console.log(response);
            return {type:"error", message: "Error"};    
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}   

export {getsubmission, approveSubmission};