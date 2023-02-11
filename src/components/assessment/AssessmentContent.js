import AssessmentCard from "./AssessmentCard";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getQuestionsAssigned from "../../requests/getQuestionsAssigned";
import SeasonList from "../panels/SeasonList";

export default function AssessmentContent() {
  const userId = useSelector((state) => state.user.username);
  const season = useSelector((state) => state.season.value);
  const [questionAssigned, setQuestionAssigned] = useState([]);
  useEffect(() => {
    getQuestionsAssigned(season, userId, setQuestionAssigned);
  }, [userId, season]);
  return (
    <Box>
      <SeasonList></SeasonList>
      {console.log(questionAssigned)}
      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        {questionAssigned &&
          questionAssigned.map((question, id) => {
            return <AssessmentCard question={question} />;
          })}
      </Box>
    </Box>
  );
}
