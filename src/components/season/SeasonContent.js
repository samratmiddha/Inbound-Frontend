import {
  ListItem,
  Typography,
  Box,
  List,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { changeRound, changeLoadingStatus } from "../../features/roundSlice";
import { useTheme } from "@mui/material";

export default function SeasonContent() {
  const dispatch = useDispatch();
  const round = useSelector((state) => state.round.roundData);
  const isLoading = useSelector((state) => state.round.isLoading);
  const theme = useTheme();
  useEffect(() => {
    async function fetchdata() {
      const data = await BackendClient.get("rounds/").then((res) => {
        dispatch(changeLoadingStatus(false));
        return res.data;
      });
      dispatch(changeRound(data));
    }
    fetchdata();
  }, [dispatch]);

  return (
    <div class="container">
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 5,
          width: "14rem",
          textAlign: "center",
          heigth: "800",
        }}
      >
        <List>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Rounds</Typography>
          </ListItem>
          {isLoading ? (
            <CircularProgress />
          ) : (
            round.map((data, id) => {
              console.log(data);
              return (
                <ListItem>
                  <ListItemButton
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="body1">{data.name}</Typography>
                  </ListItemButton>
                </ListItem>
              );
            })
          )}
        </List>
      </Box>
      <Box
        sx={{
          backgroundColor: "Background.paper",
          width: "50rem",
        }}
      >
        <Typography variant="h1">Helo</Typography>
      </Box>
    </div>
  );
}
