import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";
import AssessmentModal from "./AssesssmentModal";

export default function EvaluateButton(props) {
  const dispatch = useDispatch();
  const handleOpen = () => {
    console.log("yeyayayayaya")
    dispatch(setOpen(true));
  };

  return (
    <>
      <Button onClick={handleOpen}>
        {console.log(props.evaluate)}Evaluate
      </Button>
      <AssessmentModal />
    </>
  );
}
