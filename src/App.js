import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "@emotion/react";
import themes from "./theme";
import store from "./store";
import { Provider } from "react-redux";
import SeasonPage from "./pages/SeasonPage";
import Information from "./pages/information";
import Panels from "./pages/panels";
import Users from "./pages/users";
import Chat from "./pages/chat";
import { createTheme } from "@mui/material";

function App() {
  const theme = (theme) =>
    createTheme({
      palette: themes["Dark"],
      overrides: {
        MuiTabs: {
          root: {
            backgroundColor: themes["Dark"].background.main, // overrides blue background for panel
          },
          indicator: {
            backgroundColor: "#000000",
          },
        },
        MuiTab: {
          root: {
            "&$selected": {
              // proper way for styling selected tab
              color: "#000000",

              "&:hover": {
                backgroundColor: "000000",
                color: "#000000",
              },
            },
          },
          wrapper: {
            // styles tab value
            color: "#000000",
          },
        },
      },
    });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/season" element={<SeasonPage />} />
            <Route path="/information" element={<Information />} />
            <Route path="/panels" element={<Panels />} />
            <Route path="/users" element={<Users />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
