import { Card, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function AssessmentCard() {
  const columns = [
    { field: "name", headerName: "Name", hideable: "true", flex: 50 },
    {
      field: "studentId",
      headerName: "SID",
      hideable: "true",
      type: "number",
      flex: 50,
    },
    {
      field: "marks",
      headerName: "Marks",
      hideable: "true",
      type: "number",
      editable: "true",
      flex: 50,
    },
  ];
  const rows = [
    { id: 1, studentId: 2, marks: 50, name: "samrat" },
    { id: 2, studentId: 3, marks: 50, name: "akhil" },
    { id: 3, studentId: 4, marks: 50, name: "noble" },
    { id: 4, studentId: 2, marks: 50, name: "samrat" },
    { id: 5, studentId: 3, marks: 50, name: "akhil" },
    { id: 6, studentId: 4, marks: 50, name: "noble" },
  ];
  return (
    <Card
      sx={{ height: "80%", width: "30%", padding: "1rem", marginLeft: "2rem" }}
    >
      <Box>
        <Typography color="secondary" variant="h5" align="center">
          Question Name
        </Typography>
        <Typography color="primary.contrastTet">
          Lorem ipsum dolor sit amet. Quo nostrum velit At expedita rerum ex
          placeat exercitationem aut sapiente veniam. Et velit quod et facilis
          veniam aut dignissimos temporibus non sint ducimus.
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography color="secondary">Max Marks:</Typography>
          <Typography color="primary.contrastText">100</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography color="secondary" align="center">
          Unchecked
        </Typography>
        <DataGrid
          sx={{ width: "100%" }}
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={4}
          initialState={{
            columns: {
              columnVisibilityModel: {
                studentId: false,
              },
            },
          }}
        ></DataGrid>
        <Typography color="secondary" align="center">
          Checked
        </Typography>
        <DataGrid
          sx={{ width: "100%" }}
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={4}
          initialState={{
            columns: {
              columnVisibilityModel: {
                studentId: false,
              },
            },
          }}
        ></DataGrid>
      </Box>
    </Card>
  );
}
