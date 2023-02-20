import { Box } from "@mui/material";
import StudentDetails from "./StudentDetails";

export default function StudentContent(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <StudentDetails id={props.id} />
    </Box>
  );
}
