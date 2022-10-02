import { Typography } from "@mui/material";
import React from "react";
import LoginButton from "../components/Login/LoginButton";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    fontSize:80,
  },
});

export default function Login() {
  const classes = useStyles();
  return (
    <div
      class="container"
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1" className={classes.root}>Inbound</Typography>
      <LoginButton />
    </div>
  );
}
