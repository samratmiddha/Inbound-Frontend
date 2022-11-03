import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/sectionAddModalSlice";
const SectionAddModal = () => {
  const open = useSelector((state) => state.sectionAddModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: "#EEEEEE",
    top: "50%",
    left: "50%",
    width: 450,
    height: 450,
    textAlign: "center",
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Add Round</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SectionAddModal;
