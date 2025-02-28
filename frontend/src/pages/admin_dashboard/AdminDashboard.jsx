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
} from "@mui/material";
import dociq_logo from "../../assets/dociq_logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Admin Dashboard", path: "/admin/dashboard" },
    { text: "Form List", path: "/admin/dashboard/forms" },
    { text: "Generate Form", path: "/admin/dashboard/generate-form" },
    { text: "Submissions List", path: "/admin/dashboard/submissions" },
  ];

  const breadcrumbItems = [
    { text: "Admin Dashboard", path: "/admin/dashboard" },
    { text: "Generate Form", path: "/admin/dashboard/generate-form" },
    { text: "Form List", path: "/admin/dashboard/forms" },
    { text: "Submissions List", path: "/admin/dashboard/submissions" },
  ];

  const handleBack = () => navigate(-1);

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
          },
        }}
      >
        <Toolbar>
          <img
            src={dociq_logo}
            alt="DocIQ Logo"
            style={{ width: 40, marginRight: 10 }}
          />
          <Typography variant="h6">DocIQ</Typography>
        </Toolbar>
        <List>
          {menuItems.map(({ text, path }) => (
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
      </Drawer>

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
              .filter((item) => location.pathname.startsWith(item.path)) // Match current path
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

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminDashboard;
