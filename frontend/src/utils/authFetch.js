const logoutUser = () => {
    localStorage.removeItem("token"); // Remove token
    fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" }) // Inform backend
        .finally(() => {
            window.location.href = "/login/user"; // Redirect to login page
            alert("Your Session has Expired Sorry!");
        });
};

const authFetch = async (url, options = {}) => {
    const getToken = () => localStorage.getItem("token");

    const fetchWithAuth = async (token) => {
        const headers = new Headers(options.headers || {});
        headers.set("Authorization", `${token}`);

        if (!(options.body instanceof FormData)) {
            headers.set("Content-Type", "application/json");
        }

        const response = await fetch(url, { ...options, headers });

        if (response.ok) return response;

        // Token expired, try refreshing
        const refreshResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refreshToken`, { method: "POST", credentials: "include" });

        if (!refreshResponse.ok) {
            logoutUser(); // If refresh also fails, log out
            throw new Error("Unauthorized. User logged out.");
        }

        const newToken = await refreshResponse.headers.get("Authorization");
        localStorage.setItem("token", newToken);

        // Retry original request
        return fetchWithAuth(newToken);
    };

    return fetchWithAuth(getToken());
};

export { authFetch, logoutUser };
