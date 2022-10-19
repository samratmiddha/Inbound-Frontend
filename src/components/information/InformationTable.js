import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ConveyButton from "./ConveyButton";
import getInformation from "../../requests/getInformation";
import { useSelector } from "react-redux";
import { SouthAmericaTwoTone } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 10 },
  { field: "information", headerName: "Information", flex: 15 },
  { field: "phone", headerName: "Phone", flex: 10 },
  { field: "email", headerName: "Email", flex: 10 },
  {
    field: "conveyed",
    headerName: "Conveyed",
    flex: 8,
    renderCell: (conveyed, id) => <ConveyButton checked={conveyed} id={id} />,
  },
  { field: "studentID", headerName: "SID", flex: 5 },
];

export default function InformationTable() {
  const informationData = useSelector(
    (state) => state.information.informationData
  );
  const rows2 = [
    informationData.map((data, id) => {
      return {
        id: data.id,
        name: data.student.name,
        information: data.information,
        phone: data.student.mobile_no,
        email: data.student.email,
        conveyed: data.is_conveyed,
        studentID: data.student.id,
      };
    }),
  ];
  const infodata = getInformation();
  return (
    <div style={{ height: "86vh", width: "100%" }}>
      {console.log(rows2[0])}
      <DataGrid
        rows={rows2[0]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
