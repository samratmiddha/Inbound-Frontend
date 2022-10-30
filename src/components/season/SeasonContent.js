import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CandidateListTable from "./CandidateListTable";
import RoundTable from "./RoundTable";
import RoundTabs from "./RoundTabs";

export default function SeasonContent() {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  const value = useSelector((state) => state.roundTab.value);
  const listIsLoading = useSelector((state) => state.candidateList.isLoading);
  const dispatch = useDispatch();
  const seasonValue = useSelector((state) => state.season);
  console.log("yo yo2 ", seasonValue);

  return (
    <Box>
      {console.log("yo yo", seasonValue)}

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
            {value != "0" ? (
              <RoundTable />
            ) : (
              <CandidateListTable></CandidateListTable>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
