import BackendClient from "../BackendClient";
import {
  changeInformation,
  changeLoadingStatus,
} from "../features/informationSlice";

const getInformation = () => {
  return async (dispatch, seasonId) => {
    dispatch(changeLoadingStatus(true));
    const data = await BackendClient.get("info/?season=" + seasonId).then(
      (res) => {
        dispatch(changeLoadingStatus(false));
        console.log(res.data);
        return res.data;
      }
    );
    dispatch(changeInformation(data));
  };
};

export default getInformation;
