import BackendClient from "../BackendClient";

export default function getQuestionsAssigned(
  seasonId,
  userId,
  setQuestionAssigned
) {
  BackendClient.get(
    `questions/get_questions_by_asignee/${seasonId}/${userId}/`
  ).then((res) => {
    setQuestionAssigned(res.data);
  });
}
