import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BackendClient from "../../BackendClient";

export default function InterviewContent() {
  BackendClient.get("round_candidates/get_marks_by_round/4/").then((res) => {
    console.log("yay", res.data);
  });
  BackendClient.get("sections/get_section_groups/4/").then((res) => {
    console.log("yay2", res.data);
  });
  return (
    <Box>
      <Typography variant="h5">Interview</Typography>
    </Box>
  );
}
