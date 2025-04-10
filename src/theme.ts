import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF6347", // tomato red - pops nicely on underwater blues
    },
    secondary: {
      main: "#2E8B57", // sea green
    },
    background: {
      default: "transparent", // allow full background image
      paper: "rgba(255, 255, 255, 0.85)", // translucent card for better readability
    },
    text: {
      primary: "#0d1b2a", // deep navy blue for contrast
      secondary: "#385170", // soft navy blue
    },
  },
  typography: {
    fontFamily: '"Comic Neue", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
          textTransform: "none",
          padding: "8px 20px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        },
        contained: {
          backgroundColor: "#2E8B57",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#FF4500",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          },
        },
        outlined: {
          backgroundColor: "#fff",
          color: "#FF6347",
          "&:hover": {
            backgroundColor: "rgba(255, 99, 71, 0.1)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #ccc",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundColor: "#fff",
          opacity: 0.9,
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 12,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 12,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 12,
          overflow: "hidden",
        },
      },
      defaultProps: {
        size: "small", // <--- This sets compact mode
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#2E8B57",
          "& .MuiTableCell-root": {
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.9rem",
            padding: "6px 12px",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.07)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "6px 12px",
          fontSize: "0.875rem",
          color: "#0d1b2a",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export default theme;
