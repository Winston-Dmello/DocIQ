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

const getFilePath = async (file_path) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/documents/getURL`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"file_path":file_path})
        
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export {getDocuments, getFilePath};