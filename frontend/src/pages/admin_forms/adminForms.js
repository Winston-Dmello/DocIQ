const getforms = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/form/get`);
        const data = await response.json();
        return data.forms;
    }catch{
        return [];
    }
}

export {getforms};