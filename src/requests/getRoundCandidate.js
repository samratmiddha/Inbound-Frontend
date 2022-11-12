import {
  changeListLoadingStatus,
  changeGroupDataLoadingStatus,
  changeColumnLoadingStatus,
} from "../features/candidateListSlice";
import {
  changeCandidateListData,
  changeColumnsData,
  changeSectionGroupData,
} from "../features/candidateListSlice";
import BackendClient from "../BackendClient";

const getRoundCandidateList = () => {
  return async (dispatch, id, year) => {
    if (year > 2) {
      dispatch(changeListLoadingStatus(true));
      dispatch(changeGroupDataLoadingStatus(true));
      dispatch(changeColumnLoadingStatus(true));

      BackendClient.get(
        "round_candidates/get_marks_by_round/" +
          id +
          "/?filter-field=total_marks&percent=100"
      ).then((res) => {
        console.log("yay", res.data);
        dispatch(changeCandidateListData(res.data));
        dispatch(changeListLoadingStatus(false));
      });
      BackendClient.get("sections/get_section_groups/" + id + "/").then(
        (res) => {
          console.log("yay2", res.data);
          dispatch(changeSectionGroupData(res.data.groups));
          dispatch(changeColumnsData(res.data.columns));
          dispatch(changeGroupDataLoadingStatus(false));
          dispatch(changeColumnLoadingStatus(false));
        }
      );
    } else {
      dispatch(changeListLoadingStatus(true));
      BackendClient.get("round_candidates/?round=" + id).then((res) => {
        console.log("yay", res.data);
        dispatch(changeCandidateListData(res.data));
        dispatch(changeListLoadingStatus(false));
      });
    }
  };
};

export default getRoundCandidateList;
