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
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {


    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }

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
            backgroundColor: "primary.dark", // Dark-blue grey from theme
            color: "text.secondary", // Better contrast
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
          {["Forms", "Create Forms"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
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
        {/* Space for Back Button and Breadcrumbs */}
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Back Button */}
          <IconButton aria-label="back" sx={{ color: "text.primary" }} onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>

          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.primary" }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/forms">
              Forms
            </Link>
          </Breadcrumbs>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 3,
            width: "100%", // Ensure full width minus drawer
            height: "80%", // Leave space for breadcrumbs
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

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;