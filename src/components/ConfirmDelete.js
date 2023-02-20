import { Button, Typography, Box, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import themes from "../theme";

export default function ConfirmDelete(props) {
  const open = Boolean(props.anchorEl);
  const theme = useSelector((state) => state.theme.theme);
  const id = open ? "simple" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Box sx={{ padding: "1rem" }}>
        <Typography
          varinat="h4"
          sx={{ color: themes[theme].primary.contrastText }}
        >
          Are You Sure U want to Delete ?
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button variant="outlined" color="red" onClick={props.deleteAction}>
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginLeft: "1.5rem" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}
