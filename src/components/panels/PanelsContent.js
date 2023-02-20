import { Box } from "@mui/system";
import PanelList from "./PanelList";
import SeasonList from "./SeasonList";

export default function PanelsContent(props) {
  return (
    <Box>
      <SeasonList></SeasonList>
      <PanelList ws={props.ws}></PanelList>
    </Box>
  );
}
