import { Box, Typography } from "@mui/material";
import StudentDetails from "./StudentDetails";
import StudentRounds from "./StudentRounds";
import themes from "../../theme";
import { useSelector } from "react-redux";

export default function StudentContent(props) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "2rem",
        boxSizing: "border-box",
        overflow: "auto",
        backgroundColor: themes[theme].background.paper,
        color: themes[theme].primary.contrastText,
        overflowY: "auto",
      }}
    >
      <Typography variant="h3" sx={{ color: "secondary.main" }} align="center">
        Student Report
      </Typography>
      <br></br>
      <StudentDetails id={props.id} />
      <StudentRounds id={props.id} />
    </Box>
  );
}
