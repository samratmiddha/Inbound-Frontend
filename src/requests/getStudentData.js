import BackendClient from "../BackendClient";
import { changeStudentData } from "../features/studentSlice";

const getStudentData = () => {
  return async (studentID, dispatch) => {
    const data = await BackendClient.get("candidates/" + studentID).then(
      (res) => {
        console.log(res.data);
        return res.data;
      }
    );
    dispatch(changeStudentData(data));
  };
};

export default getStudentData;
