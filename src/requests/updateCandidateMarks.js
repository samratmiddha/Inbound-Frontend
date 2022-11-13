import BackendClient from "../BackendClient";
import getRoundCandidateList from "./getRoundCandidate";

const updateCandidateMarks = async (
  dispatch,
  studentId,
  questionId,
  marks,
  difference,
  row_id,
  prev_round_marks
) => {
  console.log(
    "bye bye",
    studentId,
    questionId,
    marks,
    difference,
    row_id,
    prev_round_marks
  );
  await BackendClient.get(
    "marks/?question=" + questionId + "&student=" + studentId
  ).then((res) => {
    for (let x in res.data) {
      let primary = res.data[x].id;
      BackendClient.patch("marks/" + primary + "/", { marks: marks }).then(
        (res) => {
          console.log(res);
        }
      );
    }
  });
};
export default updateCandidateMarks;
