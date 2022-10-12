import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

const BackendClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Headers":
  //     "Access-Control-Allow-Headers,Accept,Origin, X-Requested-With, Content-Type",
  //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  // },
});

export default BackendClient;
