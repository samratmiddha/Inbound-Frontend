import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionAddModalSlice";
import AddQuestionForm from "./QuestionAddForm";
const QuestionAddModal = (props) => {
  const open = useSelector((state) => state.questionAddModal.open);
  const round_id = useSelector((state) => state.roundTab.value);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: "#EEEEEE",
    width: 450,
    height: 400,
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
    <div class="modal-class">
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
          <Typography variant="h4">Add Question</Typography>
          <AddQuestionForm
            sectionId={props.sectionId}
            sectionName={props.sectionName}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default QuestionAddModal;
