const getsubmissions = async () => {
    try{
        const userID = localStorage.getItem("UserID");
        console.log(userID)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
        );
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

export {getsubmissions};