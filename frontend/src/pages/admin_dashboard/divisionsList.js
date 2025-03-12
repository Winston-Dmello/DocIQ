const getDivisions = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

const createDivision = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return { type: "success", message: "Success" };
        } else {
            console.log(response);
            return { type: "error", message: "Division Already Exists" };
        }
    } catch {
        return { type: "error", message: "Error Connecting to Server" };
    }
};

const deleteDivision = async (division_id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/divisions/${division_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            return { type: "success", message: "Deleted" };
        } else {
            console.log(response);
            return { type: "error", message: "Something went wrong" };
        }
    } catch {
        return { type: "error", message: "Something went wrong" };
    }
};

export { getDivisions, createDivision, deleteDivision };
