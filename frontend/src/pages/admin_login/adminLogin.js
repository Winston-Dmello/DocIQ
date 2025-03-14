import { login } from "../../contexts/jwtcontext";

const adminLogin = async (credentials) => {
    const response = await login(credentials, "admin");
    return response;
}

export default adminLogin;