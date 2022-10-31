import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";
import AssessmentModal from "./AssesssmentModal";
import { useState } from "react";
import getStudentData from "../../requests/getStudentData";
import getCandidateMarksData from "../../requests/getMarksData";
import { changeQuestions } from "../../features/questionSlice";

export default function EvaluateButton(props) {
  const dispatch = useDispatch();
  const sectionData = useSelector((state) => state.section.sectionData);
  var questions = [];
  var sectionQuestions = [];
  var allQuestions = [];
  const handleOpen = () => {
    console.log("yeyayayayaya");
    const request = getStudentData();
    request(props.evaluate.row.studentId, dispatch);

    const marksRequest = getCandidateMarksData();
    console.log(props.evaluate.row.studentId, "pppp");
    sectionData.map((data, id) => {
      sectionQuestions = {
        name: data.data.name,
        questions: [],
      };
      data.questions.map((question, id) => {
        allQuestions.push({
          id: question.id,
          name: question.question_text,
        });
        sectionQuestions.questions.push({
          id: question.id,
          name: question.question_text,
        });
      });
      questions.push(sectionQuestions);
    });
    dispatch(changeQuestions(questions));
    marksRequest(dispatch, props.evaluate.row.studentId, allQuestions);
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
