import { createContext, useState } from "react";
import PropTypes from "prop-types";

const JWTContext = createContext();

export const JWTProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);


  const getAccessToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/refreshToken`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const newToken = response.headers.get("Authorization");
        if (newToken) setAccessToken(newToken);
      } else {
        setAccessToken(null);
      }
    } catch {
      setAccessToken(null);
    }
  };

  const authFetch = async (url, options = {}) => {
    try {
      if (!accessToken) await getAccessToken();

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: accessToken,
        },
      });

      if (response.status === 401) {
        await getAccessToken();
        try {
          return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: accessToken,
            },
          });
        } catch (error) {
          console.error("Error retrying fetch after token refresh:", error);
          throw error;
        }
      }

      return response;
    } catch (error) {
      console.error("Error in authFetch:", error);
      throw error;
    }
  };

  const login = async (credentials, role) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/${role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
  
      if (response.ok) {
        const newToken = response.headers.get("Authorization");
        if (newToken) {
          setAccessToken(newToken);
          return { auth: true, message: "Login Successful" };
        }
        return { auth: false, message: "Token not received" };
      }
  
      if (response.status === 401) {
        return { auth: false, message: "Email or Password Incorrect" };
      } else if (response.status === 403) {
        return { auth: false, message: "You are not allowed to access this page" };
      } else if (response.status === 404) {
        return { auth: false, message: "User Not Found" };
      } else {
        return { auth: false, message: "Something went wrong!" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { auth: false, message: "Error Connecting to Server" };
    }
  };
  

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, { 
        method: "POST", 
        credentials: "include" 
      });
      setAccessToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear the token even if the logout request fails
      setAccessToken(null);
    }
  };

  return (
    <JWTContext.Provider value={{ accessToken, authFetch, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

JWTProvider.propTypes = {
  children: PropTypes.node.isRequired,
};