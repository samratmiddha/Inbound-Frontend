import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import themes from "../../theme";
import { reset } from "../../features/panelModalSlice";
export default function Timer(props) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        padding: "3rem",
        backgroundColor: themes[theme].background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="secondary">
        {props.hours}:{props.minutes}:{props.seconds}
      </Typography>
      <Button
        variant="contained"
        color="red"
        onClick={() => {
          dispatch(reset());
          props.setModalOpen(true);
        }}
      >
        <Typography sx={{ color: "#ffffff" }}>End Round</Typography>
      </Button>
    </Box>
  );
}
