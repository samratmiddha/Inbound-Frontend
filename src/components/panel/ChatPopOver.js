import { Box, Popover, Typography } from "@mui/material";

export default function ChatPopOver(props) {
  const handleClose = () => {
    props.setAnchorEl(null);
  };
  const open = Boolean(props.anchorEl);
  return (
    <Popover
      id="ChatPopOver"
      open={open}
      anchorEl={props.anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ width: "30rem", minHeight: "60rem" }}>
        <Typography variant="h1">yo yo wassupp</Typography>
      </Box>
    </Popover>
  );
}
