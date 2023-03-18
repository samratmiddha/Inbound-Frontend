import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import AddtoWaitlist from "./AddToWaitlist";
import MoveToPanelPopOver from "./MoveToPanelPopOver";
import themes from "../../theme";
export default function Waitlist(props) {
  const theme = useSelector((state) => state.theme.theme);
  const season = useSelector((state) => state.season.value);
  const [openWaitlistModal, setOpenWaitlistModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [waitlist, changeWaitlist] = useState();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [waitlistId, setWaitlistId] = useState(null);
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
        backgroundColor: themes[theme].background.paper,
        color: themes[theme].primary.contrastText,
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
                  onClick={(event) => {
                    setSelectedRound(item.round.id);
                    setSelectedStudent(item.student.id);
                    setWaitlistId(item.id);
                    setAnchorEl(event.target);
                  }}
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
        onClick={() => {
          setOpenWaitlistModal(true);
        }}
      >
        Add
      </Button>
      <AddtoWaitlist
        open={openWaitlistModal}
        setOpen={setOpenWaitlistModal}
        changeWaitlist={changeWaitlist}
      ></AddtoWaitlist>
      <MoveToPanelPopOver
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        selectedRound={selectedRound}
        selectedStudent={selectedStudent}
        waitlistId={waitlistId}
        changeWaitlist={changeWaitlist}
      />
    </Box>
  );
}
