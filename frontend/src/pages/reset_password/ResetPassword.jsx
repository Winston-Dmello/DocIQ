import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import resetpassword from "./resetPassword";
import SnackbarService from "../../utils/SnackbarService";


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
        SnackbarService.showSnackbar("Please enter both new password and confirm password.", {severity:"warning"});
      return;
    }

    if (newPassword !== confirmPassword) {
        SnackbarService.showSnackbar("Passwords do not match.", {severity:"warning"});
      return;
    }

    const response = await resetpassword(token, newPassword);
    SnackbarService.showSnackbar(response.message, {severity:response.severity});
    // Do your password reset logic here
    setNewPassword("");
    setConfirmPassword("");
    if(response.severity === "success"){
        navigate("/login/user");
    }

  };

  return (
    <Card sx={{ width: 400, p: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
