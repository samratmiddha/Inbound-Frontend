import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionAddModalSlice";
import AddQuestionForm from "./QuestionAddForm";
import themes from "../../theme";
const QuestionAddModal = (props) => {
  const open = useSelector((state) => state.questionAddModal.open);
  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
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
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      onBackdropClick={() => {
        handleClose();
      }}
    >
      <Box sx={style}>
        <AddQuestionForm
          sectionId={props.sectionId}
          sectionName={props.sectionName}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default QuestionAddModal;
