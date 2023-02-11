import BackendClient from "../BackendClient";

export default function getQuestionsAssigned(
  seasonId,
  userId,
  setQuestionAssigned
) {
  BackendClient.get(
    `questions/get_questions_by_asignee/${seasonId}/${userId}/`
  ).then((res) => {
    console.log("res", res);
    console.log("data", res.data);
    setQuestionAssigned(res.data);
  });
}
