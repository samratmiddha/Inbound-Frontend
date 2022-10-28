import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import RoundTable from "./RoundTable";
import RoundTabs from "./RoundTabs";

export default function SeasonContent() {
  const isLoading = useSelector((state) => state.roundTab.isLoading);
  const value = useSelector((state) => state.roundTab.value);
  const listIsLoading = useSelector((state) => state.candidateList.isLoading);
  const dispatch = useDispatch();
  
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
            {value != "" ? <RoundTable /> : <></>}
          </>
        )}
      </Box>
    </Box>
  );
}
