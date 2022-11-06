import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  IconButton,
  Button,
  CardActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setOpen } from "../../features/seasonEditModalSlice";
import EditSeasonModal from "./EditSeasonModal";
import { changeSeasonCard } from "../../features/seasonSlice";
import { useNavigate } from "react-router-dom";

export default function SeasonCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card sx={props.ongoing ? { boxShadow: "0 0 20px 5px #30d186" } : {}}>
      <CardActionArea
        onClick={() => {
          dispatch(changeSeasonValue(props.sid));
          // window.location.href =
          //   "http://localhost:3000/season?sid=" + props.sid;
          navigate("/season?sid=" + props.sid);
        }}
      >
        <CardMedia
          component="img"
          image={
            props.season_type === "designer"
              ? require("../../assets/ic_baseline-design-services.png")
              : require("../../assets/ic_baseline-code.png")
          }
          alt="design icon"
        />
        <CardContent
          sx={
            props.season_type == "developer"
              ? { paddingTop: "3rem", paddingBottom: "1rem" }
              : {}
          }
        >
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="h6">{props.session}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(setOpen(true));
              dispatch(
                changeSeasonCard({
                  season_type: props.season_type,
                  name: props.name,
                  session: props.session,
                  sid: props.sid,
                  ongoing: props.ongoing,
                })
              );
            }}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
            Edit
          </Button>
          <Button variant="outlined" sx={{ color: "red" }} size="small">
            <IconButton sx={{ color: "red" }}>
              <DeleteIcon />
            </IconButton>
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
