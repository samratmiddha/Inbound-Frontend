import InformationTable from "./InformationTable";
import { Box } from "@mui/material";

export default function InformationContent() {
  return (
    <Box sx={{ backgroundColor: "background.paper", borderRadius: 5 }}>
      <InformationTable />
    </Box>
  );
}
