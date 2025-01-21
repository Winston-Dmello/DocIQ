import adminLogin from "./adminLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    const loginResponse = await adminLogin({ email, password });
    setAlertMessage(loginResponse.message);
    setAlertType(loginResponse.auth ? "success" : "danger");

    if (loginResponse.auth) {
      navigate("/admin/dashboard");
    }
  };

  const forgotPassword = () => {
    setAlertMessage("Please refer documentation");
    setAlertType("info");
  };

  return (
    <div className="auth-container">
      <div className="auth-bg">
        <h3>Are you a User?</h3>
        <button onClick={() => navigate("/login/user")}>User Login</button>
      </div>
      <div className="auth-form">
        <h1>Admin Login</h1>
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
          <a href="#" onClick={forgotPassword}>
            Forgot Password?
          </a>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
