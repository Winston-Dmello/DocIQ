import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#253544",
    },
    secondary: {
      main: "#f2f7fb",
    },
    background: {
      default: "#f2f2f2",
      paper: "#f7fafc",
    },
    text: {
      primary: "#253544",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#253544",
      "@media (max-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
      "@media (max-width:900px)": {
        fontSize: "1.25rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 300,
      lineHeight: 1.6,
      "@media (max-width:900px)": {
        fontSize: "0.9rem",
      },
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
          minWidth: "120px",
          minHeight: "40px",
          "@media (max-width:900px)": {
            minWidth: "100px",
            minHeight: "36px",
            fontSize: "0.875rem",
          },
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
          backgroundColor: "#f7fafc",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "16px",
          "@media (max-width:900px)": {
            padding: "12px",
            maxWidth: "90%",
            margin: "0 auto",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000",
            fontSize: "1rem",
            "@media (max-width:900px)": {
              fontSize: "0.9rem",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#000 !important",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#253544",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#253544",
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
          color: "#000 !important",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
