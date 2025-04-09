import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import dociq_logo from "../../assets/dociq_logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../utils/authFetch";

const drawerWidth = 240;

const UserDashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const username = localStorage.getItem("username") || "User";

  const menuItems = [
    { text: "Dashboard", path: "/user/dashboard", icon: <DashboardIcon /> },
    { text: "Forms", path: "/user/dashboard/formslist", icon: <ListAltIcon /> },
    { text: "Submissions", path: "/user/dashboard/submissionslist", icon: <AssignmentTurnedInIcon /> },
  ];

  const breadcrumbItems = [
    { text: "User Dashboard", path: "/user/dashboard" },
    { text: "Forms List", path: "/user/dashboard/formslist" },
    { text: "Submissions List", path: "/user/dashboard/submissionslist" },
  ];

  const handleBack = () => navigate(-1);
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.default",
        color: "text.primary",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "primary.dark",
            color: "text.secondary",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {/* Logo and Navigation Menu */}
        <Box>
          <Toolbar>
            <img
              src={dociq_logo}
              alt="DocIQ Logo"
              style={{ width: 40, marginRight: 10 }}
            />
            <Typography variant="h6">DocIQ</Typography>
          </Toolbar>

          <List>
            {menuItems.map(({ text, path, icon }) => (
              <ListItem
                button={true}
                key={text}
                onClick={() => navigate(path)}
                selected={location.pathname === path}
                sx={{
                  backgroundColor:
                    location.pathname === path ? "primary.main" : "transparent",
                  "&:hover": { backgroundColor: "primary.light" },
                  borderRadius: 1,
                  marginBottom: 1,
                  cursor: "pointer",
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === path ? "white" : "text.secondary" }}>
                      {icon}
                    </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    color:
                      location.pathname === path ? "white" : "text.secondary",
                    fontWeight: location.pathname === path ? "bold" : "normal",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Username and Logout Button */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {username}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, width: "100%", gap: 1 }}
            onClick={handleLogout}
          >
            <ExitToAppIcon/>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 3,
          height: "100%",
          width: "100%",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="back"
            sx={{ color: "text.primary" }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>

          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.primary" }}>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Home
            </Link>
            {breadcrumbItems
              .filter((item) => location.pathname.startsWith(item.path))
              .map((item, index, array) => (
                <Link
                  key={item.path}
                  color={
                    index === array.length - 1 ? "text.primary" : "inherit"
                  }
                  onClick={() => navigate(item.path)}
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                >
                  {item.text}
                </Link>
              ))}
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "transparent",
            backdropFilter: "blur(8px)",
            width: "100%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            padding: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

UserDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserDashboard;
