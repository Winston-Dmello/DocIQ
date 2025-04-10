import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminLogin from "./adminLogin";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

const AdminAuth = () => {
  const [showForgotBox, setShowForgotBox] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    const loginResponse = await adminLogin({ email, password });
    setAlertMessage(loginResponse.message);
    setAlertType(loginResponse.auth ? "success" : "error");

    if (loginResponse.auth) {
      navigate("/admin/dashboard");
    }
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    setShowForgotBox(true);
  };

  const handleSendResetEmail = () => {
    if (!forgotEmail) {
      setAlertMessage("Please enter your email to reset password.");
      setAlertType("warning");
      return;
    }

    setAlertMessage("Password reset email sent.");
    setAlertType("success");
    setShowForgotBox(false);
    setForgotEmail("");
  };

  return (
    <Box
      display="flex"
      width="800px"
      height="450px"
      m="100px auto"
      boxShadow={4}
      borderRadius={2}
      overflow="hidden"
    >
      {/* Left panel */}
      <Box
        width="50%"
        bgcolor="#4056A1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textAlign="center"
        p={2}
      >
        <Typography variant="h5" mb={2}>
          Are you a User?
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: 5,
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "white",
              color: "#4056A1",
            },
          }}
          onClick={() => navigate("/login/user")}
        >
          User Login
        </Button>
      </Box>

      {/* Right panel - Admin login */}
      <Box
        width="50%"
        bgcolor="#EAE7DC"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={4}
      >
        <Typography variant="h4" mb={3} color="#333">
          Admin Login
        </Typography>

        {alertMessage && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}

        <form onSubmit={onLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "#4056A1" }}
              onClick={forgotPassword}
            >
              Forgot Password?
            </Typography>
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Forgot Password Popup */}
      {showForgotBox && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0,0,0,0.4)"
          zIndex={1000}
        >
          <Card sx={{ width: 400, p: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                label="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSendResetEmail}>
                  Send
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowForgotBox(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default AdminAuth;
