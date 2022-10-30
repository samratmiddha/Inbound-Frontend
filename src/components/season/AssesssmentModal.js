import { Modal, Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";
import getCandidateMarksData from "../../requests/getMarksData";
import getStudentData from "../../requests/getStudentData";
const AssessmentModal = (props) => {
  const studentData = useSelector((state) => {
    return state.student.studentData;
  });
  var questions = [];
  var sectionQuestions = [];
  const sectionData = useSelector((state) => state.section.sectionData);
  const open = useSelector((state) => state.assessmentModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    bgcolor: "#EEEEEE",
    width: "50vw",
    height: "80vh",
    textAlign: "center",
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  const request = getCandidateMarksData();
  console.log(props.rowData.row.studentId, "pppp");
  sectionData.map((data, id) => {
    // sectionQuestions = [];
    data.questions.map((question, id) => {
      questions.push({
        id: question.id,
        name: question.question_text,
      });
    });
    // questions.push(sectionQuestions);
    request(dispatch, props.rowData.row.studentId, questions);
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h4">Report</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            <>
              <Typography variant="h6">Name : </Typography>
              <Typography display="inline">{studentData.name} </Typography>
            </>
            <>
              <Typography variant="h6">Email : </Typography>
              <Typography>{studentData.email} </Typography>
            </>
            <>
              <Typography variant="h6">CG : </Typography>
              <Typography>{studentData.CG} </Typography>
            </>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "60%",
              alignSelf: "center",
            }}
          >
            <>
              <Typography variant="h6">Branch : </Typography>
              <Typography>{studentData.branch} </Typography>
            </>
            <>
              <Typography variant="h6">Mobile No : </Typography>
              <Typography>{studentData.mobile_no} </Typography>
            </>
            <>
              <Typography variant="h6">Year : </Typography>
              <Typography>{studentData.year} </Typography>
            </>
          </Box>
        </Box>
        <Box>{console.log(questions)}</Box>
      </Box>
    </Modal>
  );
};

export default AssessmentModal;
