import { Backdrop, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonForm from "./AddSeasonForm";

export default function AddSeasonModal() {
  const open = useSelector((state) => state.seasonModal.open);
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
            <Typography variant="h4">Add Season</Typography>
            <AddSeasonForm />
          </Box>
        </Grid>
      </Modal>
    </div>
  );
}
