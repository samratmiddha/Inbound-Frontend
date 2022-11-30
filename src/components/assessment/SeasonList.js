import { CircularProgress, Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";

export default function SeasonList() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.season.value);
  const seasons = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  const handleChange = (event, newValue) => {
    console.log("kyu");
    dispatch(changeSeasonValue(newValue));
  };

  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      {console.log(seasons)}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          seasons.map((data, id) => {
            return <Tab label={data.name} value={data.id} />;
          })
        )}
      </Tabs>
    </Box>
  );
}
