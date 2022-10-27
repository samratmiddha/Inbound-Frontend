import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPanelList from "../../requests/getPanelList";
import { Box } from "@mui/system";

import PanelCard from "./PanelCard";
import AddPanelCard from "./AddPanelCard";

const PanelList = () => {
  const seasonValue = useSelector((state) => state.season.value);
  const panelListData = useSelector((state) => state.panelList.panelListData);
  const isLoading = useSelector((state) => state.panelList.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    const request = getPanelList();
    request(dispatch, seasonValue);
  }, [dispatch, seasonValue]);
  return (
    <Box backgroundColor="background.paper">
      {isLoading ? (
        <CircularProgress />
      ) : (
        panelListData.map((data, id) => {
          return <PanelCard data={data} />;
        })
      )}
      {seasonValue ? <AddPanelCard></AddPanelCard> : <></>}
    </Box>
  );
};

export default PanelList;
