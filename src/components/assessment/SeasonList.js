import {
  ListItemButton,
  ListItem,
  Typography,
  List,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";

export default function SeasonList() {
  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      {console.log(seasons)}
      <List>
        {isLoading ? (
          <CircularProgress />
        ) : (
          seasons.map((data, id) => {
            return (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    dispatch(changeSeasonValue(data.id));
                  }}
                >
                  <Typography variant="body2">{data.name}</Typography>
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
    </Box>
  );
}
