import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";

export default function UserCard(props) {
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
    console.log("nnnnnnnnnnnn", name);
    if (name.split(" ")[1]) {
      return {
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        children: `${name[0][0]}`,
      };
    }
  }
  function getRole(year) {
    if (year == 2) {
      return "Project Asoociate";
    } else if (year == 4) {
      return "Coordinater";
    } else if (year == 3) {
      return "Project Leader";
    } else if (year == 1) {
      return "WebMaster";
    } else {
      return "Emertius Coordinater";
    }
  }
  return (
    <Card sx={{ margin: "1rem" }}>
      <Box sx={{ display: "flex", width: "100%", padding: "1rem" }}>
        <Box sx={{ marginLeft: "1rem" }}>
          <Avatar
            {...stringAvatar(props.user.name)}
            sx={{
              width: "5rem",
              height: "5rem",
              bgcolor: stringToColor(props.user.name),
            }}
          />
        </Box>
        <Box sx={{ marginLeft: "2rem", marginRight: "1rem" }}>
          {console.log(props.user.name, "uuuuuuuuuuuuuuuuuuuu")}
          <Typography sx={{ fontWeight: "bold" }}>{props.user.name}</Typography>
          <Typography>{props.user.email}</Typography>
          <Typography>{getRole(props.user.year)}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
