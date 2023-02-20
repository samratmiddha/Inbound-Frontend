import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";

export default function StudentRounds(props) {
  const [studentRounds, changeStudentRounds] = useState([]);
  const [studentSections, changeStudentSections] = useState([]);
  const getStudentRounds = async (id) => {
    await BackendClient.get("round_candidates/candidate=" + id + "/").then(
      (res) => {
        changeStudentRounds(res.data);
      }
    );
  };
  const getStudentSections = async (id) => {
    await BackendClient.get(`sectional_marks/student=${id}&r`).then((res) => {
      changeStudentSections(res.data);
    });
  };
  function getSectionsByRound(id) {
    var newArray = studentSections.filter(function (item) {
      return item.section.round.id === id;
    });
    return newArray;
  }
  function convertToDatagridColumns(arr) {
    var columns = [];

    for (let x in arr) {
      columns.push({
        field: arr[x].section.id,
        headerName: arr[x].section.name,
        type: "number",
      });
    }
    return columns;
  }
  function convertToDatagridRows(arr) {
    var rows = [];
    var row = {};
    for (let x in arr) {
      row = { ...row, [arr[x].section.id]: arr[x].marks };
    }
    rows.push(row);
    return rows;
  }
  useEffect(() => {
    getStudentRounds(props.id);
    getStudentSections(props.id);
  }, [props.id]);

  return (
    <Box sx={{ width: "100%", backgroundColor: "background.paper" }}>
      {studentRounds.map((round) => {
        return (
          <Box>
            <Typography>{round.round.name}</Typography>
            <Typography>Marks Obtained: </Typography>
            <Typography>{round.marks}</Typography>
            <Typography>Normalized Marks: </Typography>
            <Typography>{round.normalized_marks}</Typography>
            <Typography>comments: </Typography>
            <Typography>{round.comments}</Typography>
            {round.round.type === "T" ? (
              <Box>
                <DataGrid
                  rows={convertToDatagridRows(
                    getSectionsByRound(round.round.id)
                  )}
                  colums={convertToDatagridColumns(
                    getSectionsByRound(round.round.id)
                  )}
                ></DataGrid>
              </Box>
            ) : (
              <Box>
                <DataGrid></DataGrid>
                <Box>
                  {getSectionsByRound(round.round.id).map((section) => {
                    return (
                      <Box>
                        <Typography>{section.section.name}</Typography>
                        <Typography>comments:</Typography>
                        <Typography>{section.comment}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
