import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";
import AssessmentModal from "./AssesssmentModal";
import { useState } from "react";
import getStudentData from "../../requests/getStudentData";

export default function EvaluateButton(props) {
  const dispatch = useDispatch();
  const handleOpen = () => {
    console.log("yeyayayayaya");
    const request = getStudentData();
    request(props.evaluate.row.studentId, dispatch);
    dispatch(setOpen(true));
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
        varaint="contianed"
      >
        Evaluate
      </Button>
      <AssessmentModal rowData={props.evaluate} />
    </>
  );
}
