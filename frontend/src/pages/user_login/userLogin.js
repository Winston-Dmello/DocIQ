import { login } from "../../contexts/jwtcontext";

const userLogin = async (credentials) => {
    const response = await login(credentials, "user");
    return response;
}

export default userLogin;