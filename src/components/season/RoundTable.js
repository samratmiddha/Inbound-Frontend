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
// const columns = [
//   { field: "id", headerName: "ID", flex: 1 },
//   { field: "name", headerName: "Name", flex: 10 },
//   {
//     field: "marks",
//     headerName: "Marks",
//     flex: 15,
//     type: "number",
//     editable: true,
//   },
//   { field: "phone", headerName: "Phone", flex: 10 },
//   { field: "email", headerName: "Email", flex: 10 },
//   { field: "studentId", headerName: "Student ID", flex: 10 },
//   {
//     field: "evaluate",
//     headerName: "Evaluate",
//     flex: 8,
//     renderCell: (evaluate, id) => {
//       return <EvaluateButton evaluate={evaluate} id={id} />;
//     },
//   },

//   {
//     field: "remove",
//     headerName: "",
//     flex: 5,
//     renderCell: (remove, id) => {
//       return (
//         <Button
//           onClick={(e) => {
//             BackendClient.delete("round_candidates/" + remove.id);
//           }}
//         >
//           <IconButton aria-label="delelte" sx={{ color: "red" }}>
//             <DeleteIcon />
//           </IconButton>
//         </Button>
//       );
//     },
//   },
// ];

export default function RoundTable() {
  const [percent, setPercent] = useState(100);
  const roundId = useSelector((state) => state.roundTab.value);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const rounds = roundData.filter((round) => {
    return round.id == roundId;
  });
  const round = rounds[0];
  console.log("uwu", round);
  React.useEffect(() => {
    if (round.type == "P") {
      const listRequest = getProjectCandidateList();
      listRequest(dispatch, roundId);
    } else {
      const listRequest = getRoundCandidateList();
      listRequest(dispatch, roundId);
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
  const handleFilterClick = (event) => {};
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter />

        {round.type != "P" ? (
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
      </GridFooterContainer>
    );
  };
  const filterAnchorEl = useSelector((state) => state.filterPopOver.anchorEl);
  const handleFilterClose = () => {
    dispatch(setFilterAnchorEl(null));
  };
  const handleChange = (event) => {
    // let p = event.target.value;
    // let x = Math.floor((p * candidateListData.length) / 100);
    // let a = [];
    // for (let i = 0; i < x; i++) {
    //   a.push(candidateListData[i]);
    // }
    // setCandidateListRowData(a);
  };
  function CustomToolbar() {
    const open = Boolean(filterAnchorEl);
    const filterid = open ? "simple-popover" : undefined;
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button
            onClick={(event) => {
              dispatch(setFilterAnchorEl(event.currentTarget));
            }}
          >
            Percentage filter
          </Button>
        </GridToolbarContainer>
        <Popover
          id={filterid}
          open={open}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <input type="number" onChange={handleChange}></input>
        </Popover>
      </Box>
    );
  }
  const apiRef = useGridApiRef();
  return (
    <div style={{ height: "86vh", width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={candidateListData}
        columns={candidateColumns}
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
