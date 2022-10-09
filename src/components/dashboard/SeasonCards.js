import SeasonCard from "./SeasonCard";
import BackendClient from "../../BackendClient";
import { useSelector, useDispatch } from "react-redux";
import { changeSeason, changeLoadingStatus } from "../../features/seasonSlice";
import { React, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import AddSeasonCard from "./AddSeasonCard";

export default function SeasonCards() {
  const dispatch = useDispatch();
  const season = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  useEffect(() => {
    async function fetchdata() {
      dispatch(changeLoadingStatus(true));
      const seasondata = await BackendClient.get("seasons").then((res) => {
        dispatch(changeLoadingStatus(false));
        return res.data;
      });
      dispatch(changeSeason(seasondata));
    }
    fetchdata();
  }, [dispatch]);
  return (
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
  );
}
