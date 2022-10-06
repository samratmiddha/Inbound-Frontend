import SeasonCard from "./SeasonCard";
import BackendClient from "../../BackendClient";
import { useSelector, useDispatch } from "react-redux";
import { changeSeason, changeLoadingStatus } from "../../features/seasonSlice";
import { React, useEffect } from "react";

export default function SeasonCards() {
  const dispatch = useDispatch();
  const season = useSelector((state) => {
    console.log(state);
    return state.seasondata;
  });
  useEffect(() => {
    async function fetchdata() {
      const seasondata = await BackendClient.get("seasons").then((res) => {
        dispatch(changeLoadingStatus());
        return res.data;
      });
      dispatch(changeSeason(seasondata));

      console.log(season);
    }
    fetchdata();
  }, [dispatch, season]);

  return (
    <div>
      {season}
      <SeasonCard season_type="developer" />
    </div>
  );
}
