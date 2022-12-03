import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelList from "./PanelList";
import SeasonList from "./SeasonList";

export default function AssessmentContent() {
  return (
    <Box>
      <SeasonList></SeasonList>
      <PanelList></PanelList>
    </Box>
  );
}
