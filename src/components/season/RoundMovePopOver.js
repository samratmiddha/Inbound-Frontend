import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import { List, ListItem, ListItemButton } from "@mui/material";

export default function RoundMovePopover(props) {
  const dispatch = useDispatch();
  const anchorEl = useSelector((state) => state.roundMovePopOver.anchorEl);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  let params = new URLSearchParams(window.location.search);
  const sid = params.get("sid");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List disablePadding={true} dense={true} sx={{ paddingBottom: 0 }}>
          {roundData.map((data, id) => {
            return (
              <ListItem>
                <ListItemButton>{data.name}</ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </div>
  );
}
