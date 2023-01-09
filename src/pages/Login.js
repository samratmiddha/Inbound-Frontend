import { Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../components/Login/LoginButton";
import themes from "../theme";
import { Button } from "@mui/material";
import { changeTheme } from "../features/themeSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function Login() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          backgroundColor: themes[theme].background.default,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <img
          src={require("../assets/login_background3.png")}
          style={{ width: "80%", height: "50%", alignSelf: "center" }}
          alt="background"
        />
      </Box>
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          backgroundColor: themes[theme].background.default,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            onClick={(event) => {
              console.log("button clicked");
              if (theme == "Light") {
                dispatch(changeTheme("Dark"));
              } else {
                dispatch(changeTheme("Light"));
              }
            }}
            sx={{
              color: "secondary.contrastText",
              marginBottom: "30vh",
              position: "absolute",
            }}
          >
            <WbSunnyIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "secondary.contrastText",
              alignSelf: "center",
              fontSize: "10rem",
            }}
          >
            Inbound
          </Typography>
          <LoginButton />
        </Box>
      </Box>
    </Box>
  );
}
