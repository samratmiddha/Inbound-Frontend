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
import { Button, Box, IconButton } from "@mui/material";
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
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10 },
  { field: "marks", headerName: "Marks", flex: 15, type: "number" },
  { field: "phone", headerName: "Phone", flex: 10 },
  { field: "email", headerName: "Email", flex: 10 },
  { field: "studentId", headerName: "Student ID", flex: 10 },
  {
    field: "evaluate",
    headerName: "Evaluate",
    flex: 8,
    renderCell: (evaluate, id) => {
      return <EvaluateButton evaluate={evaluate} id={id} />;
    },
  },

  {
    field: "remove",
    headerName: "",
    flex: 5,
    renderCell: (remove, id) => {
      return (
        <IconButton aria-label="delelte" sx={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      );
    },
  },
];

export default function RoundTable() {
  const roundId = useSelector((state) => state.roundTab.value);
  React.useEffect(() => {
    const listRequest = getRoundCandidateList();
    listRequest(dispatch, roundId);
  }, [roundId]);
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
  const rows2 = [
    candidateListData.map((data, id) => {
      {
        console.log(data);
      }
      return {
        id: id + 1,
        name: data.student.name,
        phone: data.student.mobile_no,
        email: data.student.email,
        marks: data.marks_obtained,
        studentId: data.student.id,
      };
    }),
  ];
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleOpen = () => {
    dispatch(setOpen(true));
  };

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter />
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
        <Box sx={{ display: "flex" }}>
          <Button onClick={handleClick}>Move</Button>
          <RoundMovePopover rows={rows2[0]} />
          <Button sx={{ color: "red" }}>Exterminate</Button>
        </Box>
      </GridFooterContainer>
    );
  };

  function CustomToolbar() {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      </Box>
    );
  }
  return (
    <div style={{ height: "86vh", width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows2[0]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows2[0].filter((row) =>
            selectedIDs.has(row.id)
          );
          console.log(selectedRowData);
          dispatch(setSelectionModel(selectedRowData));
        }}
        checkboxSelection
        disableSelectionOnClick
      ></DataGrid>
    </div>
  );
}
