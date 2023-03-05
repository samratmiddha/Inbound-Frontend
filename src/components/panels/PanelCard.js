import {
  CardContent,
  Card,
  Typography,
  Box,
  CardActions,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setPanelData } from "../../features/panelEditModalSlice";
import { setOpen } from "../../features/panelEditModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarGroup } from "@mui/material";
import { setOpen as panelModalOpen } from "../../features/panelModalSlice";
import { setPanel } from "../../features/panelModalSlice";
import { useNavigate } from "react-router-dom";

const PanelCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (name.split(" ").length > 1) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
      };
    }
  }
  let styles = {
    width: "20rem",
    marginTop: "2rem",
    marginRight: "1.5rem",
    marginLeft: "1.5rem",
    textAlign: "center",
  };
  if (props.data.is_active) {
    styles = { ...styles, boxShadow: "0 0 10px 7px #68A7AD" };
  }
  return (
    <Card backgroundColor="background.paper" sx={styles}>
      <CardActionArea
        onClick={() => {
          dispatch(setPanel(props.data.id));
          navigate("/panel/" + props.data.id + "/");
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "2rem", color: "secondary.main" }}
          >
            {props.data.location}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space around",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              Members:
            </Typography>
            <AvatarGroup max={4}>
              {props.data.members.map((member, id) => {
                if (member.name != null) {
                  return <Avatar {...stringAvatar(member.name)} />;
                }
              })}
            </AvatarGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "centre",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              Status:
            </Typography>
            {props.data.is_active ? (
              <Typography
                varaint="body2"
                sx={{ alignSelf: "center", marginLeft: "1rem", color: "green" }}
              >
                Active
              </Typography>
            ) : (
              <Typography
                varaint="body2"
                sx={{ alignSelf: "center", marginLeft: "1rem", color: "red" }}
              >
                {" "}
                Not Active
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "centre",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              Current Student:
            </Typography>
            {props.data.current_student ? (
              <Typography
                varaint="body2"
                sx={{
                  alignSelf: "center",
                  marginLeft: "1rem",
                  color: "primary.contrastText",
                }}
              >
                {props.data.current_student.name}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "centre",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              Type:
            </Typography>
            {props.data.type ? (
              <Typography
                varaint="body2"
                sx={{
                  alignSelf: "center",
                  marginLeft: "1rem",
                  color: "primary.contrastText",
                }}
              >
                {props.data.type}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      {user.year > 2 ? (
        <CardActions sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(setOpen(true));
                dispatch(setPanelData(props.data));
              }}
              color="secondary"
            >
              <IconButton color="secondary">
                <EditIcon />
              </IconButton>
              Edit
            </Button>
            <Button variant="outlined" color="red" size="small">
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
  );
};

export default PanelCard;
