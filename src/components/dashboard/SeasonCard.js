import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";

export default function SeasonCard(props) {
  return (
    <Card>
      {console.log("hi2")}
      <CardActionArea>
        <CardMedia
          component="icon"
          height="100"
          width="100"
          icon={props.season_type == "designer" ? DesignServicesIcon : CodeIcon}
        />
        <CardContent>
          <Typography variant="h5">Hello</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
