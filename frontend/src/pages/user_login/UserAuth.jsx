import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {userLogin, forgotpassword} from "./userLogin";
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
import SnackbarService from "../../utils/SnackbarService";

const UserAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showForgotBox, setShowForgotBox] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    const loginResponse = await userLogin({ email, password });
    setAlertMessage(loginResponse.message);
    setAlertType(loginResponse.auth ? "success" : "error");

    if (loginResponse.auth) {
      localStorage.setItem("UserID", loginResponse.userid);
      console.log("User ID is set!");
      navigate("/user/dashboard");
    }
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    setShowForgotBox(true);
  };

  const handleSendResetEmail = async () => {
    if (!forgotEmail) {
      SnackbarService.showSnackbar("Please enter your email to reset password.", {severity:"warning"});
      return;
    }

    const response = await forgotpassword(forgotEmail);

    SnackbarService.showSnackbar(response.message, {severity:response.severity});
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
        bgcolor="#F8F9FA"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={4}
      >
         <Typography variant="h4" mb={3} color="#333">
          User Login
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
              sx={{ cursor: "pointer", color: "#008891" }}
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

      {/* Right panel - User login */}
      <Box
        width="50%"
        bgcolor="#008891"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textAlign="center"
        p={2}
      >
       <Typography variant="h5" mb={2}>
          Are you an Admin?
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
              color: "#008891",
            },
          }}
          onClick={() => navigate("/login/admin")}
        >
          Admin Login
        </Button>
      </Box>

      {/* Forgot Password Overlay */}
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

export default UserAuth;
