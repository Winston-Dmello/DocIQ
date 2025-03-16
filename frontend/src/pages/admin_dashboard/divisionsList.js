import { authFetch } from "../../utils/authFetch";

const getDivisions = async () => {
    try {
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'GET',
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
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/divisions`, {
            method: 'POST',
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
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}/divisions/${division_id}`, {
            method: 'DELETE',
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
