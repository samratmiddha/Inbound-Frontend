import InformationTable from "./InformationTable";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function InformationContent() {
  const isLoading = useSelector((state) => state.information.isLoading);
  return (
    <Box sx={{ backgroundColor: "background.paper", borderRadius: 5 }}>
      {isLoading ? <CircularProgress /> : <InformationTable />}
    </Box>
  );
}
