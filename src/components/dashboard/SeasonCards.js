import SeasonCard from "./SeasonCard";
import BackendClient from "../../BackendClient";
import { useSelector, useDispatch } from "react-redux";
import { changeSeason, changeLoadingStatus } from "../../features/seasonSlice";

async function SeasonData() {
  const seasondata = await BackendClient.get("seasons").then((res) => {
    return res.data;
  });

  const season_data_array = [];
  for (let key in seasondata) {
    season_data_array.push(seasondata[key]);
  }
  return season_data_array;
}

async function Season_Cards() {
  const season = useSelector((state) => state.season.seasonData);
  const dispatch = useDispatch();
  const seasondata = await SeasonData();
  return <div>{/* <SeasonCard season_type="designer" />; */}</div>;
}

const SeasonCards = Season_Cards();
export default SeasonCards;
