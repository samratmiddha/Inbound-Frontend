import BackendClient from "../BackendClient";
import { changeLoadingStatus, changeSeason } from "../features/seasonSlice";

const getSeasonList = () => {
  return async (dispatch) => {
    dispatch(changeLoadingStatus(true));
    await BackendClient.get("seasons")
      .then((res) => {
        dispatch(changeLoadingStatus(false));
        return res.data;
      })
      .then((data) => dispatch(changeSeason(data)));
  };
};

export default getSeasonList;
