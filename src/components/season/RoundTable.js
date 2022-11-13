import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  GridToolbar,
  GridFooter,
  GridFooterContainer,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, IconButton, Popover } from "@mui/material";
import RoundMovePopover from "./RoundMovePopOver";
import AssessmentModal from "./AssesssmentModal";
import EvaluateButton from "./EvaluateButton";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import { setSelectionModel } from "../../features/candidateSelectionSlice";
import { setOpen } from "../../features/questionPaperModalSlice";
import QuestionPaperModal from "./QuestionPaperModal";
import DeleteIcon from "@mui/icons-material/Delete";
import getSectionList from "../../requests/getSectionList";
import BackendClient from "../../BackendClient";
import { setAnchorEl as setFilterAnchorEl } from "../../features/filterPopOverSlice";
import { useState } from "react";
import { useGridApiRef } from "@mui/x-data-grid";
import updateCandidateMarks from "../../requests/updateCandidateMarks";
import { type } from "@testing-library/user-event/dist/type";
import getProjectCandidateList from "../../requests/getProjectCandidate";
import PercentagePopOver from "./PercentagePopOver";
import PercentIcon from "@mui/icons-material/Percent";
const columns1 = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10 },
  { field: "phone", headerName: "Phone", flex: 10 },
  { field: "email", headerName: "Email", flex: 10 },
  { field: "studentId", headerName: "Student ID", flex: 10 },
  { field: "panel", headerName: "Panel", flex: 10 },
];

export default function RoundTable() {
  const [percent, setPercent] = useState(100);
  const roundId = useSelector((state) => state.roundTab.value);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const user = useSelector((state) => state.user);
  const rounds = roundData.filter((round) => {
    return round.id == roundId;
  });
  const round = rounds[0];
  console.log("uwu", round);
  React.useEffect(() => {
    if (round.type == "P" && user.year > 2) {
      const listRequest = getProjectCandidateList();
      listRequest(dispatch, roundId);
    } else {
      const listRequest = getRoundCandidateList();
      listRequest(dispatch, roundId, user.year, "", 100);
    }
  }, [roundId, round]);
  const selectionModel = useSelector(
    (state) => state.candidateSelection.selectionModel
  );
  React.useEffect(() => {
    const request = getSectionList();
    console.log("uuuuuuuuuu" + roundId);
    request(dispatch, roundId);
  }, [roundId]);

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
      console.log("lll", candidateListData);
    }
  }
  const candidateColumns = useSelector(
    (state) => state.candidateList.columnsData
  );
  const candidateGroups = useSelector(
    (state) => state.candidateList.sectionGroupData
  );
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  const anchorFEl = React.useRef();
  const [popOverOpen, setPopOverOpen] = React.useState(false);
  const handleFClick = (event) => {
    // dispatch(setFilterAnchorEl(event.currentTarget));
    // setAnchorFEl(event.currentTarget);
    setPopOverOpen(true);
  };
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter />

        {round.type != "P" && user.year > 2 ? (
          <div>
            <Button
              variant="contained"
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
            <Button onClick={handleClick}>Move</Button>
            <RoundMovePopover />
            <Button
              sx={{ color: "red" }}
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
          </Box>
        ) : (
          <></>
        )}
      </GridFooterContainer>
    );
  };
  const filterAnchorEl = useSelector((state) => state.filterPopOver.anchorEl);

  const handleChange = (event) => {
    // let p = event.target.value;
    // let x = Math.floor((p * candidateListData.length) / 100);
    // let a = [];
    // for (let i = 0; i < x; i++) {
    //   a.push(candidateListData[i]);
    // }
    // setCandidateListRowData(a);
  };
  var columns = candidateColumns;
  if (user.year < 3) {
    columns = columns1;
  }
  function CustomToolbar() {
    return (
      <Box>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Box sx={{ display: "flex", width: "80px", marginLeft: "5px" }}>
            <Button onClick={handleFClick} ref={anchorFEl}>
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
        </GridToolbarContainer>
      </Box>
    );
  }
  const apiRef = useGridApiRef();

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
        }}
        columnVisibilityModel={{
          student_id: false,
        }}
        experimentalFeatures={{ columnGrouping: true }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = candidateListData.filter((row) =>
            selectedIDs.has(row.id)
          );
          console.log(selectedRowData);
          dispatch(setSelectionModel(selectedRowData));
        }}
        onCellEditCommit={(data) => {
          console.log("oooo", data);
          let a = candidateListData.filter(
            (candidate) => candidate.id == data.id
          );
          console.log("yofo", a);
          let x = data.field.toString();
          let z = a[0][x];
          let difference = data.value - z;
          console.log("nnnn", typeof x, difference, x, data.value, z);
          updateCandidateMarks(
            dispatch,
            a[0].student_id,
            data.field,
            data.value,
            difference,
            data.id,
            a[0].total_marks
          );
        }}
        columnGroupingModel={candidateGroups}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={{
          "& .${gridClasses.row}.odd": {
            backgroundColor: "rgba(58,71,80,0.1)",
            "&:hover, &.Mui-hovered": {
              backgroundColor: "rgba(58,71,80,0.1)",
              "@media (hover: none)": {
                backgroundColor: "transparent",
              },
            },
          },
        }}
      ></DataGrid>
    </div>
  );
}
