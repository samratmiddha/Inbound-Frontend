import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import { List, ListItem, ListItemButton } from "@mui/material";
import moveRound from "../../requests/MoveRound";
import BackendClient from "../../BackendClient";

export default function RoundMovePopover(props) {
  const dispatch = useDispatch();
  const student_id = useSelector((state) => state.panelModal.student);
  const anchorEl = useSelector((state) => state.roundMovePopOver.anchorEl);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const selectedRows = useSelector(
    (state) => state.candidateSelection.selectionModel
  );

  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  let params = new URLSearchParams(window.location.search);
  const seasonid = useSelector((state) => state.season.value);
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
      <List
        disablePadding={true}
        dense={true}
        sx={{ paddingBottom: 0, color: "primary.contrastText" }}
      >
        {roundData.map((data, id) => {
          return (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  if (props.fromPanel) {
                    BackendClient.post("round_candidates/", {
                      round: data.id,
                      student: student_id,
                      _marks_obtained: 0,
                    });
                    BackendClient.post("info/", {
                      information: "Moved To Round " + data.name,
                      remarks: "",
                      student: student_id,
                      is_conveyed: false,
                      season: seasonid,
                    });
                  } else {
                    moveRound(data.id, seasonid, selectedRows, data.name);
                  }
                  handleClose();
                }}
              >
                {data.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
}
