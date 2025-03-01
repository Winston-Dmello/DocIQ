const getDocuments = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/documents`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export {getDocuments};