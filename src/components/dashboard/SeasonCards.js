import SeasonCard from "./SeasonCard";
import { useSelector } from "react-redux";
import { React } from "react";
import { CircularProgress, Typography } from "@mui/material";
import AddSeasonCard from "./AddSeasonCard";
import { Box } from "@mui/material";
import EditSeasonModal from "./EditSeasonModal";

export default function SeasonCards() {
  const season = useSelector((state) => state.season.seasonData);
  const isLoading = useSelector((state) => state.season.isLoading);
  const user = useSelector((state) => state.user);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "secondary.main" }}>
        {" "}
        Seasons
      </Typography>
      <div class="season-container">
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
                ongoing={data.is_ongoing}
              ></SeasonCard>
            );
          })
        )}
        {user.year > 2 ? (
          <>
            <AddSeasonCard />
            <EditSeasonModal />
          </>
        ) : (
          <></>
        )}
      </div>
    </Box>
  );
}
