import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

export default function SeasonCard(props) {
  return (
    <Card onClick={() => (window.location.href = "http://www.google.com")}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            props.season_type === "designer"
              ? require("../../assets/ic_baseline-design-services.png")
              : require("../../assets/ic_baseline-code.png")
          }
          alt="design icon"
        />
        <CardContent>
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="h6">{props.session}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
