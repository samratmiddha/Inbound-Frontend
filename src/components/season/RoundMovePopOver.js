import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import { List, ListItem, ListItemButton } from "@mui/material";
import moveRound from "../../requests/MoveRound";

export default function RoundMovePopover() {
  const dispatch = useDispatch();
  const anchorEl = useSelector((state) => state.roundMovePopOver.anchorEl);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const selectedRows = useSelector(
    (state) => state.candidateSelection.selectionModel
  );

  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  let params = new URLSearchParams(window.location.search);
  const seasonid = params.get("sid");
  const open = Boolean(anchorEl);
  const id = open ? "simple" : undefined;
  return (
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
      {/* {console.log(selectedRowData)} */}
      <List disablePadding={true} dense={true} sx={{ paddingBottom: 0 }}>
        {roundData.map((data, id) => {
          return (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  moveRound(data.id, seasonid, selectedRows, data.name);
                  handleClose();
                }}
              >
                {data.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <input type="text"></input>
    </Popover>
  );
}
