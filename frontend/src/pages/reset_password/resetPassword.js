const resetpassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/reset-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
        });

        if (response.ok) {
            return { message: "Password reset successful", severity: "success" };
        } else {
            return { message: "Password reset failed", severity: "error" };
        }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return { message: "Error connecting to server", severity: "error" };
    }        
}

export default resetpassword;