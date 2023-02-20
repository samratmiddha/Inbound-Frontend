import InformationTable from "./InformationTable";
import { Box } from "@mui/material";
import SeasonList from "../panels/SeasonList";

export default function InformationContent() {
  return (
    <Box sx={{ backgroundColor: "background.paper", borderRadius: 5 }}>
      <SeasonList />
      <InformationTable />
    </Box>
  );
}
