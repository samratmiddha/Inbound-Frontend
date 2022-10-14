import { changeLoadingStatus } from "../features/candidateListSlice";
import { changeCandidateListData } from "../features/candidateListSlice";
import BackendClient from "../BackendClient";

const getRoundCandidateList = () => {
  return async (dispatch, id) => {
    dispatch(changeLoadingStatus(true));
    const data = await BackendClient.get("round_candidates/?round=" + id).then(
      (res) => {
        dispatch(changeLoadingStatus(false));
        console.log(res.data);
        return res.data;
      }
    );
    dispatch(changeCandidateListData(data));
  };
};

export default getRoundCandidateList;
