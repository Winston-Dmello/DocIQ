import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { createUser } from "./createUser";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [division, setDivision] = useState("");
  const [association, setAssociation] = useState("");

  const navigate = useNavigate();

  const roles = ["admin", "user"];
  const divisions = [
    "Computer Science Department",
    "College Management",
    "Mathematics Department",
    "Library",
    "Sports Department",
    "Other",
  ];
  const associations = [
    "Cybernectics",
    "Hindi Parishad",
    "Analytica",
    "Student Council",
    "Kannada Sanga",
    "French Association",
    "German Association",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser({
      user_name,
      email,
      password,
      designation,
      role,
      division,
      association,
    });
    console.log(response);
    alert(response.message);
  }

  const handleClose = () => {
    navigate(-1);
  }

  return (
    <Container maxWidth sx={{ height: "100%" }}>
      <Card
        elevation={4}
        sx={{
          height: "95%",
          p: 4,
          borderRadius: 3,
          padding: 5,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Create Users
        </Typography>
        <CardContent>
          <form>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="user_name"
                  label="User Name"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  value={user_name || ""}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email || ""}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="password"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password || ""}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="designation"
                  label="Designation"
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  value={designation || ""}
                />
              </Box>

              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
                <FormControl fullWidth sx={{ flex: "1" }}>
                  <InputLabel shrink sx={{ color: "text.primary" }}>
                    Role
                  </InputLabel>
                  <Select
                    label="Role"
                    displayEmpty
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles.map((r, index) => (
                      <MenuItem
                        key={index}
                        value={r}
                        sx={{ color: "text.primary" }}
                      >
                        {r}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
              <FormControl fullWidth sx={{ flex: "1" }}>
                  <InputLabel shrink sx={{ color: "text.primary" }}>
                    Division
                  </InputLabel>
                <Select
                  label="Division"
                  displayEmpty
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                >
                  {divisions.map((d, index) => (
                    <MenuItem
                      key={index}
                      value={d}
                      sx={{ color: "text.primary" }}
                    >
                      {d}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}>
              <FormControl fullWidth sx={{ flex: "1" }}>
                  <InputLabel shrink sx={{ color: "text.primary" }}>
                    Association?
                  </InputLabel>
                <Select
                  label="Association?"
                  displayEmpty
                  value={association}
                  onChange={(e) => setAssociation(e.target.value)}
                >
                  {associations.map((a, index) => (
                    <MenuItem
                      key={index}
                      value={a}
                      sx={{ color: "text.primary" }}
                    >
                      {a}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClose}
              >
                Close
              </Button>

              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateUser;
