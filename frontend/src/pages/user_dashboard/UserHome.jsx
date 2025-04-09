import { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Card,
  CardContent, 
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BusinessIcon from "@mui/icons-material/Business";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";
import { logoutUser } from "../../utils/authFetch";

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("user_name");
    const designation = localStorage.getItem("designation");
    const department = localStorage.getItem("division");
    setUser(username);
    setDesignation(designation);
    setDepartment(department);
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Box sx={{ padding: 3, width: "100%", bgcolor: "background.default" }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
          Welcome, {user || "User"}!
        </Typography>
      </Box>

      {/* User Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* User Card */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 2,
              height: "100%",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 8
              },
              borderTop: "4px solid",
              borderColor: "primary.main"
            }}
          >
            <CardContent sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              p: 3 
            }}>
              <Avatar 
                sx={{ 
                  bgcolor: "primary.light", 
                  width: 64, 
                  height: 64, 
                  mb: 2 
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
                User
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500, color: "text.primary" }}>
                {user || "Not Available"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Designation Card */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 2,
              height: "100%",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 8
              },
              borderTop: "4px solid",
              borderColor: "success.main"
            }}
          >
            <CardContent sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              p: 3 
            }}>
              <Avatar 
                sx={{ 
                  bgcolor: "success.light", 
                  width: 64, 
                  height: 64, 
                  mb: 2 
                }}
              >
                <WorkIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
                Designation
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500, color: "text.primary" }}>
                {designation || "Not Available"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Division Card */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 2,
              height: "100%",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 8
              },
              borderTop: "4px solid",
              borderColor: "primary.main"
            }}
          >
            <CardContent sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              p: 3 
            }}>
              <Avatar 
                sx={{ 
                  bgcolor: "primary.light", 
                  width: 64, 
                  height: 64, 
                  mb: 2 
                }}
              >
                <BusinessIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
                Division
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500, color: "text.primary" }}>
                {department || "Not Available"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {/* Forms */}
            <Grid item xs={12} sm={4}>
              <RouterLink to="/user/dashboard/formslist" style={{ textDecoration: 'none' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2.5, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.selected",
                      cursor: "pointer",
                      transform: "translateY(-3px)",
                      boxShadow: 3
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mb: 1.5, width: 56, height: 56 }}>
                    <ArticleIcon fontSize="medium" />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Forms
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
            
            {/* Submissions */}
            <Grid item xs={12} sm={4}>
              <RouterLink to="/user/dashboard/submissionslist" style={{ textDecoration: 'none' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2.5, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.selected",
                      cursor: "pointer",
                      transform: "translateY(-3px)",
                      boxShadow: 3
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mb: 1.5, width: 56, height: 56 }}>
                    <AssignmentTurnedInIcon fontSize="medium" />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Submissions
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
            
            {/* Logout */}
            <Grid item xs={12} sm={4}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2.5, 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  bgcolor: "action.hover",
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "action.selected",
                    cursor: "pointer",
                    transform: "translateY(-3px)",
                    boxShadow: 3
                  }
                }}
                onClick={handleLogout}
              >
                <Avatar sx={{ bgcolor: "error.main", mb: 1.5, width: 56, height: 56 }}>
                  <LogoutIcon fontSize="medium" />
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Logout
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserHome;