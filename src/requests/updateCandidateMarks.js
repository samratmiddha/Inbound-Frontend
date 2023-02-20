import BackendClient from "../BackendClient";

const updateCandidateMarks = async (studentId, questionId, marks) => {
  await BackendClient.get(
    "marks/?question=" + questionId + "&student=" + studentId
  ).then((res) => {
    for (let x in res.data) {
      let primary = res.data[x].id;
      BackendClient.patch("marks/" + primary + "/", { marks: marks }).then(
        (res) => {}
      );
    }
  });
};
export default updateCandidateMarks;
