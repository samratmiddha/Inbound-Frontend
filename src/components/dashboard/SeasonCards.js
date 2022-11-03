import SeasonCard from "./SeasonCard";
import BackendClient from "../../BackendClient";
import { useSelector, useDispatch } from "react-redux";
import { changeSeason, changeLoadingStatus } from "../../features/seasonSlice";
import { React, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import AddSeasonCard from "./AddSeasonCard";
import { Box } from "@mui/material";

export default function SeasonCards() {
  const dispatch = useDispatch();
  const season = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5"> Seasons</Typography>
      <div class="season-container">
        {console.log(season)}
        {isLoading ? (
          <CircularProgress />
        ) : (
          season.map((data, id) => {
            return (
              <SeasonCard
                season_type={data.season_type}
                name={data.name}
                session={data.session}
                key={id}
                sid={data.id}
              >
                {console.log(data, data.id)}
              </SeasonCard>
            );
          })
        )}
        <AddSeasonCard />
      </div>
    </Box>
  );
}
