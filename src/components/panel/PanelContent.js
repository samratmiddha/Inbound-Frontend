import { Box, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import BeginPanelModal from "./BeginPanelModal";
import StudentDetails from "./StudentDetails";
import Timer from "./Timer";
import ChatIcon from "@mui/icons-material/Chat";
import ChatPopOver from "./ChatPopOver";
import { useSelector } from "react-redux";
import CurrentRound from "./CurrrentRound";
import Result from "./Result";
export default function PanelContent(props) {
  const [panelInfo, setPanelInfo] = useState();
  const [ChatAnchorEl, setChatAnchorEl] = useState();
  const student = useSelector((state) => state.panelModal.studentData.id);
  useEffect(() => {
    BackendClient.get("panels/" + props.id + "/").then((res) => {
      console.log(res.data, "panelinfo");
      setPanelInfo(res.data);
    });
  }, [props.id]);

  const [open, setOpen] = useState(!Boolean(student));
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [s, SS] = useState("NO");
  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [student]);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      if (minutes < 59) {
        setMinutes((minutes) => minutes + 1);
      } else {
        setMinutes(0);
        setHours((hours) => hours + 1);
      }
    }
  }, [seconds]);
  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };
  return (
    <Box>
      {panelInfo != null ? (
        <Box>
          {console.log(s)}
          <BeginPanelModal
            open={open}
            setOpen={setOpen}
            id={props.id}
            season_id={panelInfo.season}
            resetTimer={resetTimer}
          ></BeginPanelModal>
          <Box sx={{ display: "flex" }}>
            <StudentDetails />
            <Timer
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              setModalOpen={setOpen}
            />
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <CurrentRound />
      <Result />
      <Fab
        color="secondary"
        sx={{ position: "fixed", bottom: "4rem", right: "4rem" }}
        onClick={(event) => {
          setChatAnchorEl(event.target);
        }}
      >
        <ChatIcon />
      </Fab>
      <ChatPopOver anchorEl={ChatAnchorEl} setAnchorEl={setChatAnchorEl} />
    </Box>
  );
}
