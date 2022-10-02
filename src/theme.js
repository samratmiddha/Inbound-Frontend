import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

const theme = createTheme({
  palette: {
    type: light,
    primary: {
      main: "#3A4750",
      contrastText: "#EEEEEE",
    },
    secondary: {
      main: "#00ADB5",
      contrastText: "#EEEEEE",
    },
    blue: {
      main: "#00ADB5",
    },
    grey: {
      main: "#3A4750",
    },
    darkGrey: {
      main: "#303841",
    },
    black: {
      main: "#212121",
    },
  },
  typography: {
    h1: {
      color: "#00ADB5",
    },
  },
});

export default theme;
