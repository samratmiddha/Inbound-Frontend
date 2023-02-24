import BackendClient from "./BackendClient";
import { setUserData } from "./features/userSlice";
import { FRONTEND_HOST } from "./constants.js";

export default function CheckLogin(dispatch) {
  BackendClient.get("check_login/").then((res) => {
    if (!res.data.Logged_In) {
      window.location.href = `${FRONTEND_HOST}login`;
    } else {
      dispatch(setUserData(res.data.user));
    }
  });
}
