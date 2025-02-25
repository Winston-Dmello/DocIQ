const getforms = async () => {
    try{
        const userID = localStorage.getItem("UserID");
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/form/user/${userID}`);
        const data = await response.json();
        return data.forms;
    }catch{
        return [];
    }
}

export {getforms};