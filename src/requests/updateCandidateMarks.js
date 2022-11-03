import BackendClient from "../BackendClient";

const updateCandidateMarks = async (studentId, questionId, marks) => {
  await BackendClient.get(
    "marks/?question=" + questionId + "&student=" + studentId
  ).then((res) => {
    if (res.data.length > 0) {
      for (var x in res.data) {
        BackendClient.patch("marks/" + res.data[x].id + "/", {
          marks: marks,
        });
      }
    } else {
      BackendClient.post("marks/", {
        marks: marks,
        normalized_marks: marks,
        is_checked: false,
        question: questionId,
        student: studentId,
      });
    }
  });
};

export default updateCandidateMarks;
