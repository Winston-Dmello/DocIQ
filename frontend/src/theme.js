import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#253544",  // Dark blue-gray for primary elements
    },
    secondary: {
      main: "#f2f7fb",  // Light blueish gray for accents
    },
    background: {
      default: "#ffffff", // Clean white background
      paper: "#f2f2f2",   // Light gray for card-like elements
    },
    text: {
      primary: "#253544",  // Dark blue-gray for readability
      secondary: "#f2f7fb", // Light blue-gray for subtle text
    },
  },
  typography: {
    fontFamily: "Monserrat, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#253544",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#253544",
            color: "#fff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});

export default theme;