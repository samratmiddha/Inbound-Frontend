import { Box } from "@mui/system";
import AddtoWaitlist from "./AddToWaitlist";
import PanelList from "./PanelList";
import SeasonList from "./SeasonList";
import Waitlist from "./Waitlist";
import { useState } from "react";

export default function PanelsContent(props) {
  return (
    <Box>
      <SeasonList></SeasonList>
      <Box sx={{ display: "flex" }}>
        <PanelList ws={props.ws}></PanelList>
        <Waitlist></Waitlist>
      </Box>
    </Box>
  );
}
