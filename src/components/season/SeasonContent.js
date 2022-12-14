import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CandidateListTable from "./CandidateListTable";
import EditSeasonModal from "../dashboard/EditSeasonModal";
import RoundTable from "./RoundTable";
import RoundTabs from "./RoundTabs";
import PercentageFilter from "./PercentagePopOver";
export default function SeasonContent(props) {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  const value = useSelector((state) => state.roundTab.value);
  const listIsLoading = useSelector((state) => state.candidateList.isLoading);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const seasonValue = useSelector((state) => state.season);

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
                {/* <PercentageFilter /> */}
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
