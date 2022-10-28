import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/roundMoveModalSlice";
import RoundMoveForm from "./RoundMoveForm";
const RoundMoveModal = () => {
  const open = useSelector((state) => state.roundMoveModal.open);
  const dispatch = useDispatch();
  const style = {
    posittion: "relative",
    bgcolor: "#EEEEEE",
    width: 450,
    height: 400,
    textAlign: "center",
    borderRadius: 5,
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box sx={style}>
            <Typography variant="h4">Add Panel</Typography>
            <RoundMoveForm onClose={handleClose} />
          </Box>
        </Grid>
      </Modal>
    </div>
  );
};

export default RoundMoveModal;
