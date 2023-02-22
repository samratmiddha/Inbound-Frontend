import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

const BackendClient = axios.create({
  baseURL: `${process.env.BACKEND_HOST}`,
  withCredentials: true,
});

export default BackendClient;
