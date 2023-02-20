import BackendClient from "../BackendClient";

const getStudentData = async (studentID, changeStudentData) => {
  await BackendClient.get("candidates/" + studentID).then((res) => {
    changeStudentData(res.data);
  });
};

export default getStudentData;
