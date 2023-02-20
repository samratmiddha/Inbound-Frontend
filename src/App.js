import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "@emotion/react";
import themes from "./theme";
import SeasonPage from "./pages/SeasonPage";
import Information from "./pages/information";
import Panels from "./pages/panels";
import Users from "./pages/users";
import Chat from "./pages/chat";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Assessment from "./pages/assessment";
import Student from "./pages/Student";
import PanelPage from "./pages/PanelPage";

function App() {
  const themeName = useSelector((state) => state.theme.theme);
  const theme = (theme) =>
    createTheme({
      palette: themes[themeName],
    });

  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/panel/:id" element={<PanelPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
