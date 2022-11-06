import BackendClient from "../BackendClient";

const updateCandidateMarks = async (
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
    if (res.data.length > 0) {
      for (var x in res.data) {
        BackendClient.patch("marks/" + res.data[x].id + "/", {
          marks: marks,
        });
        BackendClient.get(
          "sectional_marks/?section=" +
            res.data[x].question.section.id +
            "&student=" +
            studentId
        ).then((res) => {
          for (var x in res.data) {
            console.log("kkkk", res.data[x]);
            let new_marks = res.data[x].marks + difference;
            BackendClient.patch("sectional_marks/" + res.data[x].id + "/", {
              marks: new_marks,
            });
          }
        });
      }
      var new_round_marks = prev_round_marks + difference;
      BackendClient.patch("round_candidates/" + row_id + "/", {
        marks_obtained: new_round_marks,
      });
    } else {
      BackendClient.post("marks/", {
        marks: marks,
        normalized_marks: marks,
        is_checked: true,
        question: questionId,
        student: studentId,
      });
    }
  });
};

export default updateCandidateMarks;
