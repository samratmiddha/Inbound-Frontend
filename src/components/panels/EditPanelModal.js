import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/panelEditModalSlice";
import EditPanelForm from "./EditPanelForm";
import themes from "../../theme";

export default function EditPanelModal() {
  const open = useSelector((state) => state.panelEditModal.open);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    backgroundColor: themes[theme].background.paper,
    color: themes[theme].primary.contrastText,
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
    <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" sx={{ color: "secondary.main" }}>
          Edit Panel
        </Typography>
        <EditPanelForm onClose={handleClose} />
      </Box>
    </Modal>
  );
}
