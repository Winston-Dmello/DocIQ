const userLogin = async ({email, password}) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
            credentials: 'include'
        })
        const token = response.headers.get("Authorization");
        localStorage.setItem("token", token);
        console.log(token);
        if(response.ok){
            const data = await response.json();
            localStorage.setItem("user_name", data.user.user_name);
            localStorage.setItem("designation", data.user.designation);
            localStorage.setItem("division", data.user.division);

            return {auth: true, message: 'Login Successful', userid: data.user.user_id};
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


const forgotpassword = async (email) => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email
            }),
            credentials: 'include'
        })
        if(response.ok){
            return {message: 'Email Sent Successfully', severity:"success"};
        }else if(response.status === 404){
            return {message: 'Email does not exist', severity:"warning"};
        }else {
            return {message: 'Something went wrong!', severity:"error"};
        }    
    } catch {
        return {message: 'Error Connecting to Server', severity:"error"};
    }
}

export {userLogin, forgotpassword};