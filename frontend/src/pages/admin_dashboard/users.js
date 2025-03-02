
const createUser = async (data) => {
    try{
        const response = await fetch('http://localhost:3000/api/users', {
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
            return {type:"error", message: "User Email Already in Use"};
        }
    }catch{
        return {type: "error", message: "Error Connecting to Server"};
    }
}

export {createUser};