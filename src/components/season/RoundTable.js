import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  GridToolbar,
  GridFooter,
  GridFooterContainer,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import RoundMovePopover from "./RoundMovePopOver";

import AssessmentModal from "./AssesssmentModal";
import EvaluateButton from "./EvaluateButton";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import getRoundCandidateList from "../../requests/getRoundCandidate";
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10 },
  { field: "marks", headerName: "Marks", flex: 15, type: "number" },
  { field: "phone", headerName: "Phone", flex: 10 },
  { field: "email", headerName: "Email", flex: 10 },
  {
    field: "evaluate",
    headerName: "Evaluate",
    flex: 8,
    renderCell: (evaluate, id) => (
      <EvaluateButton evaluate={evaluate} id={id} />
    ),
  },
];

export default function RoundTable() {
  const roundId = useSelector((state) => state.roundTab.value);
  React.useEffect(() => {
    const listRequest = getRoundCandidateList();
    listRequest(dispatch, roundId);
  }, [roundId]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  React.useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);
  const candidateListData = useSelector(
    (state) => state.candidateList.candidateListData
  );
  const rows2 = [
    candidateListData.map((data, id) => {
      return {
        id: id + 1,
        name: data.student.name,
        phone: data.student.mobile_no,
        email: data.student.email,
        marks: parseInt(data.marks_obtained),
      };
    }),
  ];
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ display: "flex" }}>
          <Button onClick={handleClick}>Move</Button>
          <RoundMovePopover />
          <Button sx={{ color: "red" }}>Exterminate</Button>
        </Box>
        <GridFooter />
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
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        checkboxSelection
        disableSelectionOnClick
      ></DataGrid>
    </div>
  );
}
