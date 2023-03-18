import * as React from "react";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import { List, ListItem, ListItemButton } from "@mui/material";
import moveRound from "../../requests/MoveRound";
import BackendClient from "../../BackendClient";
import getPanelList from "../../requests/getPanelList";

export default function MoveToPanelPopOver(props) {
  const dispatch = useDispatch();
  const request = getPanelList();
  const panelData = useSelector((state) => state.panelList.panelListData);
  const season = useSelector((state) => state.season.value);
  const handleClose = () => {
    props.setAnchorEl(null);
  };
  const seasonid = useSelector((state) => state.season.value);
  React.useEffect(() => {
    request(dispatch, seasonid);
  }, []);
  const open = Boolean(props.anchorEl);
  return (
    <Popover
      id="MoveToPanelPopOver"
      open={open}
      anchorEl={props.anchorEl}
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
        {panelData.map((data, id) => {
          return (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  BackendClient.get("panels/" + data.id + "/").then((res) => {
                    if (res.data.current_student == null) {
                      BackendClient.patch(`panels/${data.id}/`, {
                        current_student: props.selectedStudent,
                        current_round: props.selectedRound,
                      });
                      BackendClient.delete(
                        `waitlist/${props.waitlistId}/`
                      ).then((res1) => {
                        BackendClient.get("waitlist/?season=" + season).then(
                          (res2) => {
                            props.changeWaitlist(res2.data);
                          }
                        );
                      });
                    }
                  });
                }}
              >
                {data.location}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
}
