import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import getStudentData from "../../requests/getStudentData";
import StudentDetails from "./StudentDetails";

export default function StudentContent(props) {
  const [studentData, changeStudentData] = useState({});
  useEffect(() => {
    getStudentData(props.id, changeStudentData);
  }, [props.id]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <StudentDetails studentData={studentData} id={props.id} />
    </Box>
  );
}
