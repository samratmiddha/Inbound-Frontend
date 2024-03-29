import * as React from "react";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import { List, ListItem, ListItemButton } from "@mui/material";
import moveRound from "../../requests/MoveRound";
import BackendClient from "../../BackendClient";

export default function RoundMovePopover(props) {
  const dispatch = useDispatch();
  const student_id = useSelector((state) => state.panelModal.student);
  const panel_id = useSelector((state) => state.panelModal.panel);
  const anchorEl = useSelector((state) => state.roundMovePopOver.anchorEl);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const selectedRows = useSelector(
    (state) => state.candidateSelection.selectionModel
  );

  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
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
                      panel: panel_id,
                    }).then((res) => {
                      BackendClient.post("info/", {
                        information: "Moved To Round " + data.name,
                        remarks: "",
                        student: student_id,
                        is_conveyed: false,
                        season: seasonid,
                        round_info: res.data.id,
                      });
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
