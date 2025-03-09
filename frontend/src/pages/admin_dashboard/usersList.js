const getUsers = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
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

export {getUsers};