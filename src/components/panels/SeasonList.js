import { CircularProgress, Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";
import themes from "../../theme";

export default function SeasonList() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const value = useSelector((state) => state.season.value);
  const seasons = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  const handleChange = (event, newValue) => {
    console.log("kyu");
    dispatch(changeSeasonValue(newValue));
  };

  return (
    <Box sx={{ backgroundColor: themes[theme].secondary.main }}>
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
