import BackendClient from "../BackendClient";

export default function moveRound(rid, sid, studentData, roundName) {
  const postData = [];
  const infoData = [];
  console.log(rid);
  console.log(sid);
  console.log(studentData);
  studentData.forEach((data) => {
    postData.push({
      round: rid,
      student: data.studentId,
      time_start: null,
      duration: null,
      marks_obtained: null,
      remarks: null,
      psnel: null,
    });
    infoData.push({
      information: "Moved To Round " + roundName,
      remarks: "",
      student: data.studentId,
      is_conveyed: false,
    });
  });
  BackendClient.post("round_candidates/multiple_create/", postData).then(
    (res) => {
      console.log(res);
    }
  );
  BackendClient.post("info/multiple_create/", infoData).then((res) => {
    console.log(res);
  });
}