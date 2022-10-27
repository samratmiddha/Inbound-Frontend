import BackendClient from "./BackendClient";
import { setUserData } from "./features/userSlice";
export default function CheckLogin(dispatch) {
  BackendClient.get("check_login/").then((res) => {
    console.log(res.data);
    if (!res.data.Logged_In) {
      window.location.href = "http://localhost:3000/login";
    } else {
      dispatch(setUserData(res.data.user));
    }
  });
}
