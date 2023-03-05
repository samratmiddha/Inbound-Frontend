import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import BeginPanelModal from "./BeginPanelModal";
export default function PanelContent(props) {
  const [panelInfo, setPanelInfo] = useState();
  useEffect(() => {
    BackendClient.get("panels/" + props.id + "/").then((res) => {
      console.log(res.data, "panelinfo");
      setPanelInfo(res.data);
    });
  }, [props.id]);
  const [open, setOpen] = useState(true);
  return (
    <Box>
      {panelInfo != null ? (
        <Box>
          <BeginPanelModal
            open={open}
            setOpen={setOpen}
            id={props.id}
            season_id={panelInfo.season}
          ></BeginPanelModal>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
