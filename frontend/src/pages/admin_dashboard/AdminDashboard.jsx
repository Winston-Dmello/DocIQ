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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import { ListItemIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import dociq_logo from "../../assets/dociq_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../utils/authFetch";

const drawerWidth = 240;

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const [open, setOpen] = useState(false);

  // Get the username from localStorage
  const username = localStorage.getItem("username") || "Admin";

  const menuItems = [
    { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Divisions", path: "/admin/dashboard/divisions", icon: <BusinessIcon /> },
    { text: "Users", path: "/admin/dashboard/users", icon: <PeopleIcon /> },
    { text: "Categories", path: "/admin/dashboard/categories", icon: <CategoryIcon /> },
    { text: "Create Form", path: "/admin/dashboard/generate-form", icon: <CreateIcon /> },
    { text: "Forms", path: "/admin/dashboard/forms", icon: <ListAltIcon /> },
    { text: "Submissions", path: "/admin/dashboard/submissions", icon: <AssignmentTurnedInIcon /> },
    { text: "Documents", path: "/admin/dashboard/documents", icon: <DescriptionIcon /> },

  ];

  const breadcrumbItems = [
    { text: "Admin Dashboard", path: "/admin/dashboard" },
    { text: "Generate Form", path: "/admin/dashboard/generate-form" },
    { text: "Form List", path: "/admin/dashboard/forms" },
    { text: "Submissions List", path: "/admin/dashboard/submissions" },
    { text: "Users", path: "/admin/dashboard/users" },
    { text: "Create User", path: "/admin/dashboard/user/create" },
    { text: "Documents", path: "/admin/dashboard/documents" },
    { text: "Categories", path: "/admin/dashboard/categories" },
    { text: "Divisions", path: "/admin/dashboard/divisions" },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

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
        overflow: "auto",
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            sx={{ position: "absolute", top: 10, left: 10 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
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
                        location.pathname === path
                          ? "primary.main"
                          : "transparent",
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
                          location.pathname === path
                            ? "white"
                            : "text.secondary",
                        fontWeight:
                          location.pathname === path ? "bold" : "normal",
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
                sx={{ mt: 1, width: "100%" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Drawer>
        </>
      ) : (
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
                      location.pathname === path
                        ? "primary.main"
                        : "transparent",
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
                      fontWeight:
                        location.pathname === path ? "bold" : "normal",
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
              sx={{ mt: 1, width: "100%", gap: 1
               }}
              onClick={handleLogout}
            >
              <ExitToAppIcon/>
              Logout
            </Button>
          </Box>
        </Drawer>
      )}

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
        {!isMobile && (
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
        )}

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "transparent",
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

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminDashboard;
