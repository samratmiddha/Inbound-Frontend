import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10 },
  { field: "marks", headerName: "Marks", flex: 15 },
  { field: "phone", headerName: "Phone", flex: 10 },
  { field: "email", headerName: "Email", flex: 10 },
];

export default function RoundTable() {
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
        marks: data.marks_obtained,
      };
    }),
  ];
  return (
    <div style={{ height: "86vh", width: "100%", backgroundColor: "white" }}>
      {console.log(rows2[0])}
      <DataGrid
        rows={rows2[0]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
