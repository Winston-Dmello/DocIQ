import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; // "<" icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getUsers } from "./usersList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onButtonClick = (userID) => {
    navigate(`/admin/dashboard/users/${userID}`);
  };

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < users.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center">
          Loading users...
        </Typography>
      </Container>
    );
  }

  if (!users) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center" color="error">
          Failed to load Users.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth>
      <Card
        sx={{
          height: "95%",
          padding: 6,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Users
          </Typography>

          {/* Search and Filter Controls */}
          {/* <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: 2,
              justifyContent: "flex-end",
            }}
          >
            <TextField
              label="Search by Form Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="resubmit">Resubmit</MenuItem>
              </Select>
            </FormControl>
          </Box> */}

          <TableContainer sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Serial Number
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    User Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Division
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "background.default" }}>
                {users
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((user, index) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{user.user_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.designation}</TableCell>
                      <TableCell>{user.division}</TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => onButtonClick(user.submission_id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {/* Add Button */}
            <IconButton
              sx={{
                backgroundColor: "secondary.main",
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "primary.main", // Green color from MUI theme
                  color: "white",
                }, // Darker green on hover
              }}
              onClick={() => navigate("/admin/dashboard/user/create")}
            >
              <AddIcon />
            </IconButton>

            {/* Pagination & Refresh Controls */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Refresh Button */}
              <IconButton onClick={fetchUsers} sx={{ color: "text.primary" }}>
                <RefreshIcon />
              </IconButton>

              {/* Previous Button */}
              <IconButton
                onClick={handlePrev}
                disabled={page === 0}
                sx={{ color: "text.primary" }}
              >
                <NavigateBeforeIcon />
              </IconButton>

              {/* Page Indicator */}
              <Typography sx={{ marginX: 1, color: "text.primary" }}>
                {page + 1} / {Math.ceil(users.length / itemsPerPage) || 1}
              </Typography>

              {/* Next Button */}
              <IconButton
                onClick={handleNext}
                disabled={(page + 1) * itemsPerPage >= users.length}
                sx={{ color: "text.primary" }}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UsersList;
