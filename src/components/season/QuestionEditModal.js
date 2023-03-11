import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionEditModalSlice";
import EditQuestionForm from "./QuestionEditForm";
import themes from "../../theme";
const QuestionEditModal = () => {
  const open = useSelector((state) => state.questionEditModal.open);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const style = {
    position: "relative",
    bgcolor: themes[theme].background.paper,
    color: themes[theme].primary.contrastText,
    width: 600,
    height: 500,
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
    <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
      <Box sx={style}>
        <EditQuestionForm />
      </Box>
    </Modal>
  );
};

export default QuestionEditModal;
