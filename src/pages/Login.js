import { Typography } from "@mui/material";
import React from "react";
import LoginButton from "../components/Login/LoginButton";
import "./styles/login.css";

export default function Login() {
  return (
    <div class="login-container">
      <Typography variant="h1">Inbound</Typography>
      <LoginButton />
    </div>
  );
}
