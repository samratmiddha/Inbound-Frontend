import { Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonForm from "./AddSeasonForm";
import themes from "../../theme";

export default function AddSeasonModal() {
  const open = useSelector((state) => state.seasonModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: themes["Dark"].background.paper,
    color: themes["Dark"].primary.contrastText,
    width: 450,
    height: 400,
    textAlign: "center",
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ color: "secondary.contrastText" }}>
            Add Season
          </Typography>
          <AddSeasonForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
