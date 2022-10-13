import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import RoundTabs from "./RoundTabs";

export default function SeasonContent() {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      {isLoading ? <CircularProgress /> : <RoundTabs />}
    </Box>
  );
}
