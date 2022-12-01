import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

const theme = createTheme({
  BaW: {
    type: "dark",
    primary: { main: "#EAEAEA", contrastText: "#EAEAEA", light: "#E2E6Ed" },
    secondary: { main: "#3C4048", contrastText: "#00ABB3" },
    background: { default: "#B2B2B2", paper: "#3C4048" },
  },
  Light: {
    type: "light",
    primary: { main: "#EAEAEA", contrastText: "#EAEAEA", light: "#E2E6Ed" },
    secondary: { main: "#3C4048", contrastText: "#00ABB3" },
    background: { default: "#B2B2B2", paper: "#3C4048" },
  },
  Dark2: {
    type: "dark",
    primary: { main: "#203647", contrastText: "#EEFBFB", light: "#E2E6Ed" },
    secondary: { main: "#007CC7", contrastText: "#4DA8DA" },
    background: { default: "#12232E", paper: "#203647" },
  },
  Dark: {
    type: "dark",
    primary: { main: "#161c24", contrastText: "#C5C6C7", light: "#E2E6Ed" },
    secondary: { main: "#007CC7", contrastText: "#66FCF1" },
    background: { default: "#0B0C10", paper: "#161c24" },
  },
  Dark3: {
    type: "dark",
    primary: { main: "#474B4F", contrastText: "#C5C6C7", light: "#E2E6Ed" },
    secondary: { main: "#007CC7", contrastText: "#86C232" },
    background: { default: "#222629", paper: "#474B4F" },
  },
});

export default theme;
