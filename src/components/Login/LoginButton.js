import React from "react";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";

function LoginRequest() {
    window.location.href = "http://localhost:8000/send_token_request"
}

export default function LoginButton() {
  return (
    <Button 
      sx={{width:300}}
      variant="outlined"
      startIcon={
        <Avatar src={require("../../assets/op_logo.png")} variant="square" />
      }
      onClick={LoginRequest}
    >
      Login With Omniport
    </Button>
  );
}
