import {
  CardContent,
  Card,
  Typography,
  Box,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setPanelData } from "../../features/panelEditModalSlice";
import { setOpen } from "../../features/panelEditModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarGroup } from "@mui/material";

const PanelCard = (props) => {
  const dispatch = useDispatch();
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
    console.log(typeof name.split(" "));
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
    styles = { ...styles, boxShadow: "0 0 20px 5px #30d186" };
  }
  return (
    <Card backgroundColor="#000000" sx={styles}>
      <CardContent sx={{ width: "100%" }}>
        {console.log(props.data.location)}
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
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
          <Typography variant="h6" sx={{ color: "black !important" }}>
            Members:
          </Typography>
          {/* {props.data.members.map((data, id) => {
            return (
              // <Typography
              //   variant="body1"
              //   sx={{ alignSelf: "center", marginLeft: "0.5rem" }}
              // >
              //   {data.username},
              // </Typography>
              
            );
          })} */}
          <AvatarGroup max={4}>
            {props.data.members.map((member, id) => {
              if (member.name != null) {
                return <Avatar {...stringAvatar(member.name)} />;
              }
            })}
          </AvatarGroup>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "centre", textAlign: "cener" }}
        >
          <Typography variant="h6" sx={{ color: "black !important" }}>
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
        {user.year > 2 ? (
          <CardActions sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(setOpen(true));
                  dispatch(setPanelData(props.data));
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
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default PanelCard;
