import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";

export default function SeasonCard(props) {
  const dispatch = useDispatch();
  return (
    <Card
      onClick={() => {
        dispatch(changeSeasonValue(props.sid));
        window.location.href = "http://localhost:3000/season?sid=" + props.sid;
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            props.season_type === "designer"
              ? require("../../assets/ic_baseline-design-services.png")
              : require("../../assets/ic_baseline-code.png")
          }
          alt="design icon"
          sx={
            props.seasontype === "developer"
              ? { marginBottom: "1.8rem" }
              : { marginBottom: "0rem" }
          }
        />
        <CardContent>
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="h6">{props.session}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
