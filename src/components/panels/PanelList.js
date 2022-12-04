import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPanelList from "../../requests/getPanelList";
import { Box } from "@mui/system";

import PanelCard from "./PanelCard";
import AddPanelCard from "./AddPanelCard";
import EditPanelModal from "./EditPanelModal";
import PanelModal from "./PanelModal";
import getRoundList from "../../requests/getRoundList";
import { setRoundData } from "../../features/panelModalSlice";
import BackendClient from "../../BackendClient";

const PanelList = (props) => {
  const seasonValue = useSelector((state) => state.season.value);
  const panelListData = useSelector((state) => state.panelList.panelListData);
  const isLoading = useSelector((state) => state.panelList.isLoading);
  const user = useSelector((state) => state.user);
  const student = useSelector((state) => state.panelModal.student);
  const dispatch = useDispatch();
  const request = getPanelList();

  props.ws.onmessage = async (event) => {
    console.log("hohohohoho", event.data);
    if (event.data.message == "Panel Info Changed") {
      request(dispatch, seasonValue);
    } else {
      console.log("lklkklklklllllllllllllll", student);
      let RoundData = await BackendClient.get(
        "round_candidates/?student=" + student
      ).then((res) => {
        console.log(res.data, "okokokok");
        return res.data;
      });
      dispatch(setRoundData(RoundData));
    }
  };
  useEffect(() => {
    request(dispatch, seasonValue);
    const request2 = getRoundList();
    request2(dispatch, seasonValue);
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
          <PanelModal />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PanelList;
