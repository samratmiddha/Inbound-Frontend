import React from "react";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import themes from "../../theme";

function LoginRequest() {
  window.location.href = "http://localhost:8000/send_token_request";
}

export default function LoginButton() {
  return (
    <Button
      sx={{
        width: 400,
        alignSelf: "center",
        marginTop: "10vh",
        fontSize: "1.5rem",
      }}
      variant="outlined"
      color="secondary"
      size="large"
      startIcon={
        <Avatar src={require("../../assets/op_logo.png")} variant="square" />
      }
      onClick={LoginRequest}
    >
      Login With Omniport
    </Button>
  );
}
