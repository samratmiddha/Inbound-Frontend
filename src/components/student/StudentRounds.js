import { Box } from "@mui/material";
import { useState } from "react";
import BackendClient from "../../BackendClient";

export default function StudentRounds(props) {
  const [studentRounds, changeStudentRounds] = useState([]);
  const getStudentRounds = async () => {
    await BackendClient.get(
      "round_candidates/candidate=" + props.id + "/"
    ).then((res) => {
      changeStudentRounds(res.data);
    });
  };
  const getStudentSections = async () => {
    await BackendClient.get(`sectional_marks/student=${props.id}&r`).then(
      (res) => {}
    );
  };
  return (
    <Box sx={{ width: "100%", backgroundColor: "background.paper" }}></Box>
  );
}
