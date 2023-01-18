import AssessmentCard from "./AssessmentCard";
import { Box } from "@mui/material";

export default function AssessmentContent() {
  return (
    <Box sx={{ display: "flex" }}>
      <AssessmentCard></AssessmentCard>
      <AssessmentCard></AssessmentCard>
    </Box>
  );
}
