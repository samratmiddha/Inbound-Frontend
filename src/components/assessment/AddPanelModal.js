import { Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/addPanelModalSlice";
import AddPanelForm from "./AddPanelForm";
import themes from "../../theme";

export default function AddPanelModal() {
  const open = useSelector((state) => state.addPanelModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    backgroundColor: themes["Dark"].background.paper,
    color: themes["Dark"].primary.contrastText,
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
          <Typography variant="h4" sx={{ color: "secondary.contrastText" }}>
            Add Panel
          </Typography>
          <AddPanelForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
