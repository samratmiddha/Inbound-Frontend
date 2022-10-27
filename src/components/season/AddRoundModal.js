import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/roundModalSlice";
import AddRoundForm from "./AddRoundForm";
const AddRoundModal = () => {
  const open = useSelector((state) => state.roundModal.open);
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
            <AddRoundForm onClose={handleClose} />
          </Box>
        </Grid>
      </Modal>
    </div>
  );
};

export default AddRoundModal;
