import userLogin from "./userLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

const UserAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();

        const loginResponse = await userLogin({ email, password });
        setAlertMessage(loginResponse.message);
        setAlertType(loginResponse.auth ? "success" : "danger");

        if (loginResponse.auth) {
            localStorage.setItem("UserID", loginResponse.userid);
            console.log("User ID is set!")
            navigate("/user/dashboard");
        }
    };

    const forgotPassword = () => {
        setAlertMessage("Contact IQAC Cell");
        setAlertType("info");
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>User Login</h1>
                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert">
                        {alertMessage}
                    </div>
                )}
                <form onSubmit={onLogin}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <a href="#" onClick={forgotPassword}>Forgot Password?</a>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>

            <div className="auth-bg">
                <h3>Are you an Admin?</h3>
                <button onClick={() => navigate("/login/admin")}>
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default UserAuth;
