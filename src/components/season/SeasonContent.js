import {
  ListItem,
  Typography,
  Box,
  List,
  CircularProgress,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { changeRound, changeLoadingStatus } from "../../features/roundSlice";
import { useTheme } from "@mui/material";
import RoundTable from "./RoundTable";

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
          width: "15%",
          textAlign: "center",
        }}
      >
        <List>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Rounds</Typography>
          </ListItem>
          <Divider></Divider>
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
          backgroundColor: "background.paper",
          width: "78%",
          borderRadius: 5,
          marginLeft: "1.5rem",
        }}
      >
        <RoundTable />
      </Box>
    </div>
  );
}
