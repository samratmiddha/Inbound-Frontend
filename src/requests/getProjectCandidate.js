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

const getProjectCandidateList = () => {
  return async (dispatch, id) => {
    dispatch(changeListLoadingStatus(true));
    dispatch(changeGroupDataLoadingStatus(true));
    dispatch(changeColumnLoadingStatus(true));

    BackendClient.get(
      "round_candidates/get_projects_by_round/" + id + "/"
    ).then((res) => {
      dispatch(changeCandidateListData(res.data));
      dispatch(changeListLoadingStatus(false));
    });
    BackendClient.get("sections/get_project_sections/" + id + "/").then(
      (res) => {
        dispatch(changeSectionGroupData(res.data.groups));
        dispatch(changeColumnsData(res.data.columns));
        dispatch(changeGroupDataLoadingStatus(false));
        dispatch(changeColumnLoadingStatus(false));
      }
    );
  };
};

export default getProjectCandidateList;
