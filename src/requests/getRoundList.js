import { changeLoadingStatus } from "../features/roundTabSlice";
import { changeRoundData } from "../features/roundTabSlice";
import BackendClient from "../BackendClient";

const getRoundList = () => {
  return async (dispatch, id) => {
    dispatch(changeLoadingStatus(true));
    const data = await BackendClient.get("rounds/?season=" + id).then((res) => {
      dispatch(changeLoadingStatus(false));
      console.log(res.data);
      return res.data;
    });
    dispatch(changeRoundData(data));
  };
};

export default getRoundList;
