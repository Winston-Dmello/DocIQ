const getsubmissions = async () => {
    try{
        const userID = localStorage.getItem("UserID");
        console.log(userID)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/user/${userID}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch{
        return [];
    }
}

export {getsubmissions};