import { Modal, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonEditModalSlice";
import EditSeasonForm from "./EditSeasonForm";
import themes from "../../theme";
const EditSeasonModal = (props) => {
  const open = useSelector((state) => state.seasonEditModal.open);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: themes[theme].background.paper,
    color: themes[theme].primary.contrastText,
    width: 450,
    height: 400,
    textAlign: "center",
    borderRadius: 5,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ color: "secondary.main" }}>
            Edit Season
          </Typography>
          <EditSeasonForm
            season_type={props.season_type}
            name={props.name}
            session={props.session}
            sid={props.id}
            ongoing={props.is_ongoing}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default EditSeasonModal;
