import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonForm from "./AddSeasonForm";

export default function AddSeasonModal() {
  const open = useSelector((state) => state.seasonModal.open);
  const dispatch = useDispatch();
  const style = {
    posittion: "absolute",
    bgcolor: "#EEEEEE",
    width: 1000,
    height: 500,

    transform: `translate(50%, 50%)`,
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Add Season</Typography>
          <AddSeasonForm />
        </Box>
      </Modal>
    </div>
  );
}
