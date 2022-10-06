import BackendClient from "./BackendClient";
export default function CheckLogin() {
  BackendClient.get("check_login/").then((res) => {
    console.log(res.data);
    if (!res.data.Logged_In) {
      window.location.href = "http://localhost:3000/login";
    }
  });
}
