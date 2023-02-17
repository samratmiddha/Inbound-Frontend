import { Card, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import getStudentByQuestion from "../../requests/getStudentsByQuestion";
import updateCandidateMarks from "../../requests/updateCandidateMarks";

export default function AssessmentCard(props) {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    getStudentByQuestion(props.question.id, setStudentData);
  }, [props.question.id]);
  const columns = [
    { field: "name", headerName: "Name", hideable: "true", flex: 50 },
    {
      field: "studentId",
      headerName: "SID",
      hideable: "true",
      type: "number",
      flex: 50,
    },
    {
      field: "marks",
      headerName: "Marks",
      hideable: "true",
      type: "number",
      editable: "true",
      flex: 50,
    },
  ];
  const [checkedRows, setCheckedRows] = useState([]);
  const [uncheckedRows, setUnCheckedRows] = useState([]);

  useEffect(() => {
    console.log(studentData);
    let checked_rows = [];
    let unchecked_rows = [];
    studentData.checked &&
      studentData.checked.map((question, id) => {
        checked_rows.push({
          name: question.student.name,
          studentId: question.student.id,
          marks: question.marks,
          id: question.id,
        });
      });
    studentData.unchecked &&
      studentData.unchecked.map((question, id) => {
        unchecked_rows.push({
          name: question.student.name,
          studentId: question.student.id,
          marks: question.marks,
          id: question.id,
        });
      });
    setCheckedRows(checked_rows);
    setUnCheckedRows(unchecked_rows);
    console.log(checkedRows, uncheckedRows);
  }, [studentData]);
  return (
    <Card
      sx={{ height: "80%", width: "30%", padding: "1rem", marginLeft: "2rem" }}
    >
      <Box>
        <Typography color="secondary" variant="h5" align="center">
          {props.question.question_name}
        </Typography>
        <Typography color="primary.contrastText">
          {props.question.question_text}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography color="secondary">Max Marks:</Typography>
          <Typography color="primary.contrastText">100</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography color="secondary" align="center">
          Unchecked
        </Typography>
        <DataGrid
          sx={{ width: "100%" }}
          rows={uncheckedRows}
          columns={columns}
          autoHeight
          pageSize={4}
          initialState={{
            columns: {
              columnVisibilityModel: {
                studentId: false,
              },
            },
          }}
          onCellEditCommit={(data) => {
            BackendClient.patch("/marks/" + data.id + "/", {
              marks: data.value,
            }).then((res) => {
              getStudentByQuestion(props.question.id, setStudentData);
            });
          }}
        ></DataGrid>
        <Typography color="secondary" align="center">
          Checked
        </Typography>
        <DataGrid
          rows={checkedRows}
          columns={columns}
          autoHeight
          pageSize={4}
          initialState={{
            columns: {
              columnVisibilityModel: {
                studentId: false,
              },
            },
          }}
          onCellEditCommit={(data) => {
            BackendClient.patch("/marks/" + data.id, {
              marks: data.value,
            }).then((res) => {
              getStudentByQuestion(props.question.id, setStudentData);
            });
          }}
          sx={{
            ".headers": {
              color: "secondary.main",
            },
            backgroundColor: "background.paper",
            "& .${gridClasses.row}.odd": {
              backgroundColor: "background.paper",
              color: "primary.contrastText",
              "&:hover, &.Mui-hovered": {
                backgroundColor: "background.paper",
                color: "primary.contrastText",
                "@media (hover: none)": {
                  backgroundColor: "transparent",
                  color: "primary.contrastText",
                },
              },
            },
            "& .${gridClasses.row}.even": {
              backgroundColor: "background.paper",
              color: "primary.contrastText",
              "&:hover, &.Mui-hovered": {
                backgroundColor: "background.paper",
                color: "primary.contrastText",
                "@media (hover: none)": {
                  backgroundColor: "transparent",
                  color: "primary.contrastText",
                },
              },
            },
          }}
        ></DataGrid>
      </Box>
    </Card>
  );
}
