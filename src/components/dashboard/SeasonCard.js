import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  IconButton,
  Button,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSeasonValue } from "../../features/seasonSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setOpen } from "../../features/seasonEditModalSlice";
import { changeSeasonCard } from "../../features/seasonSlice";
import { useNavigate } from "react-router-dom";
import BackendClient from "../../BackendClient";
import getSeasonList from "../../requests/getSeasonList";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ConfirmDelete from "../ConfirmDelete";
import { changeRoundValue } from "../../features/roundTabSlice";

export default function SeasonCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const deleteSeason = (event) => {
    BackendClient.delete("seasons/" + props.sid + "/").then((res) => {
      const request = getSeasonList();
      request(dispatch);
    });
  };
  const [deletePopOverAnchorEl, setDeletePopOverAnchorEl] = useState(null);
  const handleDeleteModalClose = () => {
    setDeletePopOverAnchorEl(null);
  };
  return (
    <Box sx={{ width: "20rem", margin: "2rem" }}>
      <Card
        sx={
          props.ongoing
            ? {
                boxShadow: "0 0 10px 7px #68A7AD",
                backgroundColor: "background.paper",
                color: "primary.contrastText",
              }
            : {
                backgroundColor: "background.paper",
                color: "primary.contrastText",
              }
        }
      >
        <CardActionArea
          onClick={() => {
            dispatch(changeRoundValue(0));
            dispatch(changeSeasonValue(props.sid));
            navigate("/season?sid=" + props.sid);
          }}
        >
          <CardContent>
            {props.season_type == "developer" ? (
              <CodeIcon
                sx={{
                  transform: "scale(7)",
                  marginBottom: "3rem",
                  marginTop: "3rem",
                  color: "secondary.main",
                }}
              />
            ) : (
              <DesignServicesIcon
                sx={{
                  transform: "scale(5)",
                  marginBottom: "3rem",
                  marginTop: "3rem",
                  color: "secondary.main",
                }}
              />
            )}

            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="h6">{props.session}</Typography>
          </CardContent>
        </CardActionArea>
        {user.year > 2 ? (
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
                color="secondary"
              >
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="red"
                size="small"
                onClick={(event) => {
                  setDeletePopOverAnchorEl(event.target);
                }}
              >
                <IconButton color="red">
                  <DeleteIcon />
                </IconButton>
                Delete
              </Button>
            </Box>
          </CardActions>
        ) : (
          <></>
        )}
      </Card>
      <ConfirmDelete
        anchorEl={deletePopOverAnchorEl}
        onClose={handleDeleteModalClose}
        deleteAction={deleteSeason}
      />
    </Box>
  );
}
