import BackendClient from "../BackendClient";

const updateCandidateData = (id, data) => {
  BackendClient.patch("candidates/" + id + "/", data);
};

export default updateCandidateData;
