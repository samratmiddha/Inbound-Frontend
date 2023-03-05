import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import themes from "../../theme";
import { useSelector } from "react-redux";

export default function StudentRounds(props) {
  const theme = useSelector((state) => state.theme.theme);
  const [studentRounds, changeStudentRounds] = useState([]);
  const [studentSections, changeStudentSections] = useState([]);
  const getStudentRounds = async (id) => {
    await BackendClient.get("round_candidates/?student=" + id).then((res) => {
      changeStudentRounds(res.data);
    });
  };
  const getStudentSections = async (id) => {
    await BackendClient.get(`sectional_marks/?student=${id}`).then((res) => {
      changeStudentSections(res.data);
    });
  };
  function getSectionsByRound(id) {
    var newArray = studentSections.filter(function (item) {
      return item.section.round === id;
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
    var row = { id: 1 };
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
    <Box
      sx={{ width: "100%", backgroundColor: themes[theme].background.paper }}
    >
      {studentRounds.map((round) => {
        return (
          <Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "secondary.main" }}
            >
              {round.round.name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ color: "secondary.main" }}>
                Marks Obtained:{" "}
              </Typography>
              <Typography>{round._marks_obtained}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ color: "secondary.main" }}>
                Normalized Marks:{" "}
              </Typography>
              <Typography>{round.normalized_marks}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ color: "secondary.main" }}>
                comments:{" "}
              </Typography>
              <Typography>{round.remarks}</Typography>
            </Box>
            {round.round.type === "T" ? (
              <Box>
                <DataGrid
                  sx={{
                    ".headers": {
                      color: "secondary.main",
                    },
                    backgroundColor: "background.paper",
                    color: "primary.contrastText",
                  }}
                  rows={convertToDatagridRows(
                    getSectionsByRound(round.round.id)
                  )}
                  columns={convertToDatagridColumns(
                    getSectionsByRound(round.round.id)
                  )}
                  autoHeight
                ></DataGrid>
              </Box>
            ) : (
              <Box>
                <DataGrid
                  sx={{
                    ".headers": {
                      color: "secondary.main",
                    },
                    backgroundColor: "background.paper",
                    color: "primary.contrastText",
                  }}
                  rows={convertToDatagridRows(
                    getSectionsByRound(round.round.id)
                  )}
                  columns={convertToDatagridColumns(
                    getSectionsByRound(round.round.id)
                  )}
                  autoHeight
                ></DataGrid>
                <Box>
                  {getSectionsByRound(round.round.id).map((section) => {
                    return (
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: "secondary.main" }}
                        >
                          {section.section.name}
                        </Typography>
                        <br></br>
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ color: "secondary.main" }}>
                            comments:
                          </Typography>

                          <Typography>{section.comment}</Typography>
                        </Box>
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
