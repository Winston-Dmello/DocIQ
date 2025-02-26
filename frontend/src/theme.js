import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#253544", // Dark blue-gray for primary elements
    },
    secondary: {
      main: "#f2f7fb", // Light blueish gray for accents
    },
    background: {
      default: "#f2f2f2", // Clean white background
      paper: "#f7fafc", // Light gray for card-like elements
    },
    text: {
      primary: "#253544", // Dark blue-gray for readability
      secondary: "#ffffff", // Ensuring label and placeholder are readable
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
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
          backgroundColor: "#f7fafc", // Subtle contrast from the main container
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000", // Ensures input text is black
          },
          "& .MuiInputLabel-root": {
            color: "#000 !important", // Ensures label text is black before clicking
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#253544", // Changes label to primary color when focused
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#253544", // Keeps border consistent
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#253544",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#253544",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000 !important", // Forces label to always be black
        },
      },
    },
  },
});

export default theme;
