import { Typography, Box } from "@mui/material";
import React from "react";
import LoginButton from "../components/Login/LoginButton";
import themes from "../theme";

export default function Login() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: themes["Dark"].background.default,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: "secondary.contrastText", alignSelf: "center" }}
      >
        Inbound
      </Typography>
      <LoginButton />
    </Box>
  );
}
