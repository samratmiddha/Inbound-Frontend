import { Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/panelEditModalSlice";
import EditPanelForm from "./EditPanelForm";

export default function EditPanelModal() {
  const open = useSelector((state) => state.panelEditModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: "#EEEEEE",
    width: 450,
    height: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    borderRadius: 5,
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Edit Panel</Typography>
          <EditPanelForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
