import { changeLoadingStatus } from "../features/seasonCandidateListSlice";
import { changeSeasonCandidateListData } from "../features/seasonCandidateListSlice";
import BackendClient from "../BackendClient";

const getSeasonCandidateList = () => {
  return async (dispatch, id) => {
    dispatch(changeLoadingStatus(true));
    const data = await BackendClient.get("candidates/?season=" + id).then(
      (res) => {
        dispatch(changeLoadingStatus(false));
        return res.data;
      }
    );
    dispatch(changeSeasonCandidateListData(data));
  };
};

export default getSeasonCandidateList;
