import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ConveyButton from "./ConveyButton";
import getInformation from "../../requests/getInformation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import BackendClient from "../../BackendClient";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1, headerClassName: "headers" },
  { field: "name", headerName: "Name", flex: 10, headerClassName: "headers" },
  {
    field: "information",
    headerName: "Information",
    flex: 15,
    headerClassName: "headers",
  },
  { field: "phone", headerName: "Phone", flex: 10, headerClassName: "headers" },
  { field: "email", headerName: "Email", flex: 10, headerClassName: "headers" },
  {
    field: "conveyed",
    headerName: "Conveyed",
    flex: 8,
    renderCell: (conveyed, id) => <ConveyButton checked={conveyed} id={id} />,
    editable: true,
    headerClassName: "headers",
  },
  {
    field: "studentID",
    headerName: "SID",
    flex: 5,
    headerClassName: "headers",
  },
  {
    field: "DateAndTime",
    headerName: "DateAndTime",
    headerClassName: "headers",
    flex: 10,
    type: "dateTime",
    editable: "true",
  },
  {
    field: "sendEmail",
    headerName: "Send Email",
    flex: 10,
    renderCell: (row) => {
      return (
        <Button
          onClick={(event) => {
            BackendClient.post("info/email/", { data: row.row });
          }}
          color="secondary"
          variant="contained"
        >
          Send
        </Button>
      );
    },
    editable: true,
    headerClassName: "headers",
  },
];

export default function InformationTable() {
  const dispatch = useDispatch();
  const informationData = useSelector(
    (state) => state.information.informationData
  );
  const seasonValue = useSelector((state) => state.season.value);
  useEffect(() => {
    const request = getInformation();
    request(dispatch, seasonValue);
  }, [dispatch, seasonValue]);
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
        DateAndTime: data.round_info.time_start,
      };
    }),
  ];
  return (
    <div style={{ height: "86vh", width: "100%" }}>
      <DataGrid
        rows={rows2[0]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          backgroundColor: "background.paper",
          color: "primary.contrastText",
          ".headers": {
            color: "secondary.main",
          },
        }}
        onCellEditCommit={(event) => {
          let current_date = new Date();
          console.log(event.value, typeof event.value);
          console.log("current_data", current_date, typeof current_date);

          BackendClient.get("info/" + event.id + "/").then((res) => {
            BackendClient.patch(
              "round_candidates/" + res.data.round_info.id + "/",

              { time_start: event.value }
            );
          });
        }}
      />
    </div>
  );
}
