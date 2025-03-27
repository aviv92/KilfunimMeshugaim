import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b22222", // firebrick red
    },
    secondary: {
      main: "#228b22", // poker green
    },
    background: {
      default: "#f9f5ef",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        },
      },
    },
  },
});

export default theme;
