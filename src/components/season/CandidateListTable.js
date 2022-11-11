import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  GridToolbar,
  GridFooter,
  GridFooterContainer,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import RoundMovePopover from "./RoundMovePopOver";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { setSelectionModel } from "../../features/candidateSelectionSlice";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import updateCandidateData from "../../requests/updateCandidateData";
import CSVUploadPopOver from "./CSVUploadPopOver";
import { setAnchorEl as setAnchor } from "../../features/csvUploadPopOverSlice";
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10, editable: true },
  { field: "mobile_no", headerName: "Phone", flex: 10, editable: true },
  { field: "email", headerName: "Email", flex: 10, editable: true },
  { field: "branch", headerName: "Branch", flex: 10, editable: true },
  { field: "CG", headerName: "CG", flex: 10, type: "number", editable: true },
  {
    field: "enrollment_number",
    headerName: "Enrollment Number",
    flex: 10,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 10,
    renderCell: (status, id) => {
      console.log(status);
      return status.value ? (
        <CancelIcon sx={{ color: "red" }}></CancelIcon>
      ) : (
        <CheckCircleIcon sx={{ color: "green" }}> </CheckCircleIcon>
      );
    },
  },
  {
    field: "candidate_from",
    headerName: "From",
    flex: 10,
    renderCell: (from, id) => {
      return from.value == "T" ? (
        <Typography>Test</Typography>
      ) : from.value == "P" ? (
        <Typography>Project</Typography>
      ) : (
        <Typography>Other</Typography>
      );
    },
  },
  { field: "student_id", headerName: "Student ID", flex: 10 },
];

export default function CandidateListTable() {
  const roundId = useSelector((state) => state.roundTab.value);
  React.useEffect(() => {
    const listRequest = getRoundCandidateList();
    listRequest(dispatch, roundId);
  }, [roundId]);
  const candidateListData = useSelector(
    (state) => state.seasonCandidateList.seasonCandidateListData
  );
  const rows2 = [
    candidateListData.map((data, id) => {
      return {
        id: data.id,
        name: data.name,
        mobile_no: data.mobile_no,
        email: data.email,
        branch: data.branch,
        CG: data.CG,
        enrollment_number: data.enrollment_number,
        candidate_from: data.candidate_from,
        status: data.is_exterminated,
        student_id: data.id,
      };
    }),
  ];
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleButtonClick = (event) => {
    dispatch(setAnchor(event.currentTarget));
  };
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter />
        <Box>
          <Button variant="contained" onClick={handleButtonClick}>
            Upload CSV
          </Button>
          <CSVUploadPopOver></CSVUploadPopOver>
        </Box>

        <Box>
          <Button onClick={handleClick}>Move</Button>

          <RoundMovePopover />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <div style={{ height: "86vh", width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows2[0]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
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
        onCellEditCommit={(params) => {
          console.log(params);
          var data = { [params.field]: params.value };
          updateCandidateData(params.id, data);
        }}
      ></DataGrid>
    </div>
  );
}
