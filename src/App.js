import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import store from "./store";
import { Provider } from "react-redux";
import SeasonPage from "./pages/SeasonPage";
import Information from "./pages/information";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/season" element={<SeasonPage />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
