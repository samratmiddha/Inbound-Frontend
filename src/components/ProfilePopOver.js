import React from "react";
import { Button, Popover, Typography, Box } from "@mui/material";
import { setAnchorEl } from "../features/profilePopOverSlice";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../BackendClient";
import { useNavigate } from "react-router-dom";

export default function ProfilePopover(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  const anchorEl = useSelector((state) => state.profilePopOver.anchorEl);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "20rem",
            padding: "1rem",
            color: "secondary.main",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              Name
            </Typography>
            <Typography display="inline" sx={{ color: "primary.contrastText" }}>
              {user.name}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ alignSelf: "center", color: "secondary.main" }}
            >
              Username
            </Typography>
            <Typography
              sx={{ alignSelf: "center", color: "primary.contrastText" }}
            >
              {user.username}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ alignSelf: "center", color: "secondary.main" }}
            >
              Year
            </Typography>
            <Typography
              sx={{ alignSelf: "center", color: "primary.contrastText" }}
            >
              {user.year}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ alignSelf: "center", color: "secondary.main" }}
            >
              Email
            </Typography>
            <Typography
              sx={{ alignSelf: "center", color: "primary.contrastText" }}
            >
              {user.email}
            </Typography>
          </Box>
          <Button
            sx={{ width: "100%" }}
            color="red"
            variant="outlined"
            onClick={() => {
              BackendClient.get("logout/").then((res) => {
                navigate("/login");
              });
            }}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
