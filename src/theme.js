import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

const theme = createTheme({
  Dark: {
    type: "dark",
    primary: { main: "#3C4048", contrastText: "#3C4048", light: "#E2E6Ed" },
    secondary: { main: "#3C4048", contrastText: "#00ABB3" },
    background: { default: "#B2B2B2", paper: "#EAEAEA" },
  },
});

export default theme;
