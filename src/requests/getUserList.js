import BackendClient from "../BackendClient";
import {
  changeLoadingStatus,
  changeUserListData,
} from "../features/userListSlice";

const getUserList = () => {
  return async (dispatch) => {
    dispatch(changeLoadingStatus(true));
    const userListdata = await BackendClient.get("users").then((res) => {
      dispatch(changeLoadingStatus(false));
      return res.data;
    });
    dispatch(changeUserListData(userListdata));
  };
};

export default getUserList;
