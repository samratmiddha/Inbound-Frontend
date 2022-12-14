import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/sectionAddModalSlice";
import AddSectionForm from "./SectionAddForm";
import themes from "../../theme";
import { PropaneSharp } from "@mui/icons-material";
const SectionAddModal = (props) => {
  const open = useSelector((state) => state.sectionAddModal.open);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const style = {
    position: "relative",
    bgcolor: themes[theme].background.paper,
    color: themes[theme].primary.contrastText,
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
          <AddSectionForm
            handleClose={handleClose}
            fromPanel={props.fromPanel}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default SectionAddModal;
