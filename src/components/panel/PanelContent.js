import { Box, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import BeginPanelModal from "./BeginPanelModal";
import StudentDetails from "./StudentDetails";
import Timer from "./Timer";
import ChatIcon from "@mui/icons-material/Chat";
import ChatPopOver from "./ChatPopOver";
import { useDispatch, useSelector } from "react-redux";
import CurrentRound from "./CurrrentRound";
import Result from "./Result";
import {
  setMinutes,
  setHours,
  setSeconds,
  resetTimer,
  increaseHours,
  increaseMinutes,
  increaseSeconds,
} from "../../features/panelModalSlice";
export default function PanelContent(props) {
  const [panelInfo, setPanelInfo] = useState();
  const [ChatAnchorEl, setChatAnchorEl] = useState();
  const student = useSelector((state) => state.panelModal.studentData.id);
  const dispatch = useDispatch();
  useEffect(() => {
    BackendClient.get("panels/" + props.id + "/").then((res) => {
      console.log(res.data, "panelinfo");
      setPanelInfo(res.data);
    });
  }, [props.id]);
  const timer = useSelector((state) => state.panelModal.timer);
  const [open, setOpen] = useState(!Boolean(student));
  const [s, SS] = useState("NO");
  useEffect(() => {
    let timer = setInterval(() => {
      dispatch(increaseSeconds());
    }, 1000);
    return () => clearInterval(timer);
  }, [student]);

  useEffect(() => {
    if (timer.seconds > 59) {
      dispatch(setSeconds(0));
      if (timer.minutes < 59) {
        dispatch(increaseMinutes());
      } else {
        dispatch(setMinutes(0));
        dispatch(increaseHours());
      }
    }
  }, [timer.seconds]);
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
              seconds={timer.seconds}
              minutes={timer.minutes}
              hours={timer.hours}
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
      <ChatPopOver
        anchorEl={ChatAnchorEl}
        setAnchorEl={setChatAnchorEl}
        panel={props.id}
        ws={props.ws}
      />
    </Box>
  );
}
