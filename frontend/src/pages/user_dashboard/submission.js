const getSubmission = async (id) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/submissions/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
    }
}

export {getSubmission};