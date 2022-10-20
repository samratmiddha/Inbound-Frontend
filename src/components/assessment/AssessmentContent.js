import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import RoundTabs from "./RoundTabs";
import SeasonList from "./SeasonList";

export default function AssessmentContent() {
  return (
    <Box sx={{ display: "flex" }}>
      <SeasonList></SeasonList>
    </Box>
  );
}
