import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import RoundTabs from "./RoundTabs";
import SeasonList from "./SeasonList";

export default function AssessmentContent() {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  const value = useSelector((state) => state.roundTab.value);
  const listIsLoading = useSelector((state) => state.candidateList.isLoading);
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
        }}
      >
        {isLoading && listIsLoading ? (
          <CircularProgress />
        ) : (
          <>
            <RoundTabs />
            <SeasonList />
          </>
        )}
      </Box>
    </Box>
  );
}
