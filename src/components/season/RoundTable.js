import * as React from "react";
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Checkbox } from "@mui/material";
import RoundMovePopover from "./RoundMovePopOver";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import { setSelectionModel } from "../../features/candidateSelectionSlice";
import { setOpen } from "../../features/questionPaperModalSlice";
import QuestionPaperModal from "./QuestionPaperModal";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import updateCandidateMarks from "../../requests/updateCandidateMarks";
import getProjectCandidateList from "../../requests/getProjectCandidate";
import PercentagePopOver from "./PercentagePopOver";
import PercentIcon from "@mui/icons-material/Percent";
import SectionAddModal from "./SectionAddModal";
import { setOpen as sectionAddModalOpenFunction } from "../../features/sectionAddModalSlice";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDelete from "../ConfirmDelete";
import { useNavigate } from "react-router-dom";
const columns1 = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "student_name",
    headerName: "Name",
    flex: 10,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 10,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 10,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "student_id",
    headerName: "Student ID",
    flex: 10,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "panel",
    headerName: "Panel",
    flex: 10,
    align: "center",
    headerAlign: "center",
  },
];

export default function RoundTable(props) {
  const dispatch = useDispatch();
  const roundId = useSelector((state) => state.roundTab.value);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const user = useSelector((state) => state.user);
  const rounds = roundData.filter((round) => {
    return round.id === roundId;
  });
  props.ws.onopen = (event) => {
    // console.log("connected");
    props.ws.send(JSON.stringify({ message: "hiiiiiiiiiii" }));
  };
  props.ws.onclose = (event) => {
    // console.log("disconnected");
  };
  props.ws.onmessage = (event) => {
    const round_request = getRoundCandidateList();
    round_request(dispatch, roundId, 4, "", 100);
  };
  const round = rounds[0];
  React.useEffect(() => {
    if (round.type === "P" && user.year > 2) {
      const listRequest = getProjectCandidateList();
      listRequest(dispatch, roundId);
    } else if (round.type === "T" && user.year > 2) {
      const listRequest = getRoundCandidateList();
      listRequest(dispatch, roundId, user.year, "", 100);
    } else {
      const listRequest = getProjectCandidateList();
      listRequest(dispatch, roundId);
    }
  }, [roundId, round, dispatch, user.year]);
  const selectionModel = useSelector(
    (state) => state.candidateSelection.selectionModel
  );
  const candidateListData = useSelector(
    (state) => state.candidateList.candidateListData
  );
  var rows = candidateListData;
  if (user.year < 3) {
    rows = [];
    for (var x in candidateListData) {
      let row = {
        id: candidateListData[x].id,
        name: candidateListData[x].student.name,
        email: candidateListData[x].student.email,
        phone: candidateListData[x].student.mobile_no,
        studentId: candidateListData[x].student.id,
      };

      if (candidateListData[x].panel != null) {
        row = { ...row, panel: candidateListData[x].panel.location };
      }
      rows.push(row);
    }
  }
  const candidateColumns = useSelector(
    (state) => state.candidateList.columnsData
  );
  const candidateGroups = useSelector(
    (state) => state.candidateList.sectionGroupData
  );

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  const anchorFEl = React.useRef();
  const studentdeleteFEl = React.useRef();
  const [popOverOpen, setPopOverOpen] = React.useState(false);
  const [deleteStudentPopOverAnchorEl, setDeletePopOverAnchorEl] =
    useState(false);
  const handleDeletePopOverClose = () => {
    setDeletePopOverAnchorEl(false);
  };
  const handleFClick = (event) => {
    setPopOverOpen(true);
  };
  const deleteStudent = () => {
    for (var x in selectionModel) {
      BackendClient.delete(
        "round_candidates/" + selectionModel[x].id + "/"
      ).then(() => {
        if (round.type === "P" && user.year > 2) {
          const listRequest = getProjectCandidateList();
          listRequest(dispatch, roundId);
        } else {
          const listRequest = getRoundCandidateList();
          listRequest(dispatch, roundId, user.year, "", 100);
        }
      });
    }
  };
  const CustomCheckBox = (props) => {
    return (
      <Checkbox
        sx={{ color: "secondary.main" }}
        {...props}
        color="secondary"
      ></Checkbox>
    );
  };
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter />

        {round.type == "T" && user.year > 2 ? (
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleOpen();
              }}
            >
              QuestionPaper
            </Button>
            <QuestionPaperModal />
          </div>
        ) : (
          <></>
        )}
        {user.year > 2 ? (
          <Box sx={{ display: "flex" }}>
            <Button onClick={handleClick} sx={{ color: "secondary.main" }}>
              Move
            </Button>
            <RoundMovePopover />
            <Button
              ref={studentdeleteFEl}
              sx={{ color: "orange" }}
              onClick={(event) => {
                setDeletePopOverAnchorEl(studentdeleteFEl);
              }}
            >
              Delete
            </Button>
            <Button
              color="red"
              onClick={() => {
                for (var x in selectionModel) {
                  BackendClient.patch(
                    "candidates/" + selectionModel[x].student_id + "/",
                    {
                      is_exterminated: true,
                    }
                  );
                }
              }}
            >
              Exterminate
            </Button>
            <ConfirmDelete
              anchorEl={deleteStudentPopOverAnchorEl}
              onClose={handleDeletePopOverClose}
              deleteAction={deleteStudent}
            />
          </Box>
        ) : (
          <></>
        )}
      </GridFooterContainer>
    );
  };
  var columnGroups = candidateGroups;
  var columns = candidateColumns;
  columns = [
    {
      field: "total_marks",
      headerName: "Total",
      flex: 10,
      type: "number",
      headerClassName: "headers",
      hideable: "true",
      align: "center",
      headerAlign: "center",
    },
    ...columns,
  ];
  if (round.type === "P") {
    columns = [
      {
        field: "submission_link",
        headerName: "Submission Link",
        flex: 20,
        hideable: "true",
        headerClassName: "headers",
        align: "center",
        headerAlign: "center",
      },
      ...columns,
    ];
  }
  if (round.type === "IT" || round.type === "IH") {
    columns = [
      {
        field: "panel",
        headerName: "Panel",
        flex: 10,
        hideable: "true",
        headerClassName: "headers",
        align: "center",
        headerAlign: "center",
      },
      ...columns,
    ];
  }
  columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 5,
      type: "number",
      headerClassName: "headers",
      hideable: "true",
      align: "center",
      headerAlign: "center",
    },
    ...columns,
  ];
  columns = [
    {
      field: "student_name",
      headerName: "Name",
      flex: 15,
      headerClassName: "headers",
      hideable: "true",
      align: "center",
      headerAlign: "center",
    },
    ...columns,
  ];
  columns = [
    {
      field: "student_id",
      headerName: "SID",
      flex: 10,
      headerClassName: "headers",
      hideable: "true",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    ...columns,
  ];
  columnGroups = [
    {
      groupId: "details",
      headerClassName: "headers",
      headerName: " Details",
      children: [
        { field: "id" },
        { field: "student_id" },
        { field: "student_name" },
        { field: "total_marks" },
        { field: "panel" },
        { field: "submission_link" },
      ],
      hideable: "true",
      align: "center",
      headerAlign: "center",
    },
    ...columnGroups,
  ];

  if (user.year < 3) {
    columns = columns1;
  }

  function CustomToolbar() {
    return (
      <Box>
        <GridToolbarContainer>
          <GridToolbarColumnsButton
            color="secondary"
            sx={{
              color: "secondary.main",
              input: { color: "#111111" },
              "& span.MuiSwitch-track": {
                backgroundColor: "red !important",
                color: "blue",
              },
            }}
          />
          <GridToolbarFilterButton sx={{ color: "secondary.main" }} />
          <GridToolbarDensitySelector sx={{ color: "secondary.main" }} />
          <GridToolbarExport sx={{ color: "secondary.main" }} />
          <Box sx={{ display: "flex", width: "80px", marginLeft: "5px" }}>
            <Button
              onClick={handleFClick}
              ref={anchorFEl}
              sx={{ color: "secondary.main" }}
            >
              <PercentIcon fontSize="small" />
              percent
            </Button>
            <PercentagePopOver
              anchorEl={anchorFEl}
              // setAnchorEl={setAnchorFEl}
              setPopOverOpen={setPopOverOpen}
              open={popOverOpen}
              columns={columns}
            />
          </Box>
          <Box sx={{ display: "flex", width: "160px", marginLeft: "5px" }}>
            <Button
              onClick={() => {
                dispatch(sectionAddModalOpenFunction(true));
              }}
              sx={{ color: "secondary.main" }}
            >
              <AddIcon />
              Add Section
            </Button>
            <SectionAddModal />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  }
  const navigate = useNavigate();
  const handleDoubleClick = (params, events, details) => {
    if (params.field == "student_name") {
      navigate("/student/" + params.row.student_id + "/");
    }
  };

  return (
    <div style={{ height: "86vh", width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
          BaseCheckbox: CustomCheckBox,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              student_id: false,
              id: false,
              ...(round.type === "P" && { submission_link: true }),
              ...(round.type !== "P" && round.type !== "T" && { panel: true }),
            },
          },
        }}
        experimentalFeatures={{ columnGrouping: true }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = candidateListData.filter((row) =>
            selectedIDs.has(row.id)
          );
          dispatch(setSelectionModel(selectedRowData));
        }}
        onCellDoubleClick={handleDoubleClick}
        onCellEditCommit={(data) => {
          if (round.type === "P") {
            BackendClient.get(
              "sections/?round=" + roundId + "&" + "name=" + data.field
            ).then((res) => {
              BackendClient.get("round_candidates/" + data.id + "/").then(
                (res2) => {
                  BackendClient.get(
                    "sectional_marks/?student=" +
                      res2.data.student.id +
                      "&section=" +
                      res.data[0].id
                  ).then((res3) => {
                    BackendClient.patch(
                      "sectional_marks/" + res3.data[0].id + "/",
                      { marks: data.value }
                    );
                  });
                }
              );
            });
          } else {
            let a = candidateListData.filter(
              (candidate) => candidate.id === data.id
            );
            updateCandidateMarks(a[0].student_id, data.field, data.value);
          }
        }}
        columnGroupingModel={columnGroups}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        componentsProps={{
          panel: {
            sx: {
              "& .MuiTypography-root": {
                color: "primary.contrastText",
              },
            },
          },
        }}
        sx={{
          color: "primary.contrastText",
          ".headers": {
            color: "secondary.main",
          },
          " .MuiDataGrid-toolbarContainer": {
            color: "primary.contrastText",
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
    </div>
  );
}
