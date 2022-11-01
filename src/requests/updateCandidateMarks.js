import BackendClient from "../BackendClient";

const updateCandidateMarks = async (studentId, questionId, marks) => {
  await BackendClient.get(
    "marks/?question=" + questionId + "&student=" + studentId
  ).then((res) => {
    for (var x in res.data) {
      BackendClient.patch("marks/" + res.data[x].id + "/", {
        marks: marks,
      });
    }
  });
};

export default updateCandidateMarks;
