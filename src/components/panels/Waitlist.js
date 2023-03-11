import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { useState } from "react";
export default function Waitlist() {
  const season = useSelector((state) => state.season.value);
  const [waitlist, changeWaitlist] = useState();
  useEffect(() => {
    BackendClient.get("waitlist/?season=" + season).then((res) => {
      changeWaitlist(res.data);
    });
  }, [season]);
  return (
    <Box
      sx={{
        width: "30%",
        height: "100%",
        minHeight: "50rem",
        margin: "1rem",
        boxSizing: "border-box",
        backgroundColor: "background.paper",
        position: "relative",
      }}
    >
      <Typography variant="h5" color="secondary" align="center">
        Waitlist
      </Typography>
      <hr></hr>
      {waitlist &&
        waitlist.map((item) => {
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem",
                }}
              >
                <Typography sx={{ alignSelf: "center" }}>
                  {item.student.name}
                </Typography>
                <Typography sx={{ alignSelf: "center" }}>
                  {item.round.name}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ alignSelf: "center" }}
                >
                  assign
                </Button>
              </Box>
              <hr></hr>
            </>
          );
        })}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ position: "absolute", bottom: "0" }}
      >
        Add
      </Button>
    </Box>
  );
}
