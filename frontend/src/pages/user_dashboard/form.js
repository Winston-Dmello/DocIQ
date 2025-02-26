const getform = async (formID) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/form/get/${formID}`);
        const data = await response.json();
        return data;
    }catch{
        return [];
    }
}

const submitform = async (formData) => {
    try{
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/submissions/create`,
            {
                method: 'POST',
                body: formData
            }

        );
        const reply = await response.json();
        console.log(reply);
        return reply;
    }catch{
        return [];
    }
}

export {getform, submitform};