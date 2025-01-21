const adminLogin = async ({email, password}) => {
    try{
        const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/login/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password    : password
            }
        )})
        if(response.ok){
            return {auth: true, message: 'Login Successful'};
        }else if(response.status === 401){
            return {auth: false, message: 'Email or Password Incorrect'};
        }else if(response.status === 403){
            return {auth: false, message: 'You are not allowed to access this page'};
        }else if(response.status === 404){
            return {auth: false, message: 'User Not Found'};
        }else {
            return {auth: false, message: 'Something went wrong!'};
        }
    } catch {
        return {auth: false, message: 'Error Connecting to Server'};
    }
}

export default adminLogin;