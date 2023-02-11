import BackendClient from "../BackendClient";

export default async function getStudentByQuestion(questionId, setStudentData) {
  await BackendClient.get(`marks/get_status_by_question/${questionId}/`).then(
    (res) => {
      console.log(res.data, "data2");
      setStudentData(res.data);
    }
  );
}
