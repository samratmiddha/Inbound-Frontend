import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import CandidateListTable from "./CandidateListTable";
import RoundTable from "./RoundTable";
import RoundTabs from "./RoundTabs";
export default function SeasonContent(props) {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  const value = useSelector((state) => state.roundTab.value);
  const listIsLoading = useSelector((state) => state.candidateList.isLoading);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "background.paper",
        }}
      >
        {isLoading && listIsLoading ? (
          <CircularProgress />
        ) : (
          <>
            <RoundTabs />
            {value != "0" ? (
              <Box>
                <RoundTable ws={props.ws} />
              </Box>
            ) : (
              <CandidateListTable></CandidateListTable>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
