import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPanelList from "../../requests/getPanelList";
import { Box } from "@mui/system";

import PanelCard from "./PanelCard";
import AddPanelCard from "./AddPanelCard";
import EditPanelModal from "./EditPanelModal";

const PanelList = () => {
  const seasonValue = useSelector((state) => state.season.value);
  const panelListData = useSelector((state) => state.panelList.panelListData);
  const isLoading = useSelector((state) => state.panelList.isLoading);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const request = getPanelList();
    request(dispatch, seasonValue);
  }, [dispatch, seasonValue]);
  return (
    <Box
      backgroundColor="background.paper"
      sx={{ display: "flex", warp: "true" }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        panelListData.map((data, id) => {
          return <PanelCard data={data} />;
        })
      )}
      {user.year > 2 ? (
        <>
          <AddPanelCard></AddPanelCard> <EditPanelModal />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PanelList;
