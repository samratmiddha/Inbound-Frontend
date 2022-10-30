import BackendClient from "../BackendClient";
import {
  changeLoadingStatus,
  changeCandidateMarksData,
} from "../features/candidateMarksSlice";

const getCandidateMarksData = () => {
  return (dispatch, studentId, questions) => {
    dispatch(changeLoadingStatus(true));
    const seasondata = BackendClient.post("marks/multiple_retrieve/", {
      studentId: studentId,
      questions: questions,
    }).then((res) => {
      dispatch(changeLoadingStatus(false));
      return res.data;
    });
    dispatch(changeCandidateMarksData(seasondata));
  };
};

export default getCandidateMarksData;
