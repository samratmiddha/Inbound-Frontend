import { Modal, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";

import getStudentData from "../../requests/getStudentData";
import { DataGrid } from "@mui/x-data-grid";
import updateCandidateMarks from "../../requests/updateCandidateMarks";
const AssessmentModal = (props) => {
  const studentData = useSelector((state) => {
    return state.student.studentData;
  });
  const open = useSelector((state) => state.assessmentModal.open);
  const marks = useSelector((state) => state.candidateMarks.candidateMarksData);
  const questions = useSelector((state) => state.question.questions);
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
        <Box>
          {questions != [] ? (
            questions.map((section, id) => {
              var columns = [];
              var rows = { id: studentData.id };
              section.questions.map((question, id) => {
                console.log(typeof question.id);
                columns.push({
                  field: question.id.toString(),
                  headerName: question.name,
                  editable: true,
                });
              });
              marks.map((data, id) => {
                if (data != []) {
                  data.map((mark, id) => {
                    rows = {
                      ...rows,
                      [mark.question.id]: mark.marks,
                    };
                  });
                }
              });
              var rowList = [];
              rowList.push(rows);

              return studentData.id ? (
                <Box>
                  {/* {console.log("kkkkk", columns, rowList, section)} */}
                  {section.questions === [] ? (
                    <></>
                  ) : (
                    <Box>
                      <Typography variant="h6">{section.name}</Typography>
                      <DataGrid
                        columns={columns}
                        rows={rowList}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                        hideFooter={true}
                        onCellEditCommit={(params) => {
                          console.log("llll", params);
                          updateCandidateMarks(
                            params.id,
                            params.field,
                            params.value
                          );
                        }}
                      ></DataGrid>
                    </Box>
                  )}
                </Box>
              ) : (
                <></>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AssessmentModal;
