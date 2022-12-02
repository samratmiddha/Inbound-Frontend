import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/roundModalSlice";
import AddRoundForm from "./AddRoundForm";
import themes from "../../theme";
const AddRoundModal = () => {
  const open = useSelector((state) => state.roundModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: themes["Dark"].background.paper,
    color: themes["Dark"].primary.contrastText,
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
          <Typography variant="h4" sx={{ color: "secondary.contrastText" }}>
            Add Round
          </Typography>
          <AddRoundForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddRoundModal;
