const getsubmission = async (id) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`);
        const data = await response.json();
        return data[0];
    }catch(error){
        console.log(error);
    }
}

export {getsubmission};