
const createUser = async (data) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
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

const getDivisions = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });
        if (response.ok) {
            const divisions = await response.json();
            return divisions;
        } else {
            return { type: "error", message: "Error Fetching Divisions" };
        }
    } catch {
        return { type: "error", message: "Error Connecting to Server" };
    }
};

export {createUser, getDivisions};