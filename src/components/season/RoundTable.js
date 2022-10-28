import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  GridToolbar,
  GridFooter,
  GridFooterContainer,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { setOpen } from "../../features/roundMoveModalSlice";

import AssessmentModal from "./AssesssmentModal";
import RoundMoveModal from "./RoundMoveModal";
import EvaluateButton from "./EvaluateButton";
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
  const handleOpen = () => {
    dispatch(setOpen(true));
  };

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Button onClick={handleOpen}>
          Move
          <RoundMoveModal></RoundMoveModal>
        </Button>
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
