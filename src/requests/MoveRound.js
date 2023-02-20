import BackendClient from "../BackendClient";

export default async function moveRound(rid, sid, studentData, roundName) {
  const postData = [];
  const infoData = [];
  studentData.forEach((data) => {
    postData.push({
      round: rid,
      student: data.student_id,
      time_start: null,
      duration: null,
      _marks_obtained: 0,
      remarks: null,
      panel: null,
    });
    infoData.push({
      information: "Moved To Round " + roundName,
      remarks: "",
      student: data.student_id,
      is_conveyed: false,
      season: sid,
    });
  });
  BackendClient.post("round_candidates/multiple_create/", postData).then(
    (res) => {
      for (let x in infoData) {
        infoData[x] = { ...infoData[x], round_info: res.data[x].id };
      }
      BackendClient.post("info/multiple_create/", infoData).then((res) => {});
    }
  );
}
