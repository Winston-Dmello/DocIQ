import userLogin from "../features/Authentication/userLogin"
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();

        const loginResponse = await userLogin({email, password});
        if(loginResponse.auth){
            alert(loginResponse.message);
            Navigate("/home");
        } else {
            alert(loginResponse.message);
        }
    }

    return (
        <>
            <form onSubmit={(e)=>onLogin(e)}>
                <h1>User Login</h1>

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Auth