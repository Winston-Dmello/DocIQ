import { useContext } from 'react';
import JWTContext from "../../contexts/jwtcontext";

// Custom hook to use auth functions
const useAuth = () => useContext(JWTContext);

const getUsers = async () => {
    const { authFetch } = useAuth();
    
    try{
        const response = await authFetch('/users', {
            method: 'GET'
        });
        
        if(response.ok){
            const users = await response.json();
            return users;
        }else{
            return {type:"error", message: "Error Fetching Users"};
        }
    }catch(error){
        return {type: "error", message: "Error Connecting to Server"};
    }
}

export {getUsers, useAuth};

