import BackendClient from "../BackendClient";
import { changeLoadingStatus, changeSeason } from "../features/seasonSlice";

const getSeasonList = () => {
  return async (dispatch) => {
    dispatch(changeLoadingStatus(true));
    const seasondata = await BackendClient.get("seasons").then((res) => {
      dispatch(changeLoadingStatus(false));
      return res.data;
    });
    dispatch(changeSeason(seasondata));
  };
};

export default getSeasonList;
