import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/login_request' component={() => { window.location = 'localhost:8000/send_token_request'; return null;} }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
