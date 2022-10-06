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
          component="img"
          height="75"
          image={
            props.season_type == "designer"
              ? require("../../assets/ic_baseline-design-services.png")
              : require("../../assets/ic_baseline-code.png")
          }
          //image="../../assets/ic_baseline-design-services.png"
          //image={require("../../assets/ic_baseline-design-services.png")}
          alt="design icon"
        />
        <CardContent>
          <Typography variant="h5">Hello</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
