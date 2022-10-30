import { Modal, Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionPaperModalSlice";
import getSectionList from "../../requests/getSectionList";
const QuestionPaperModal = () => {
  let params = new URLSearchParams(window.location.search);
  const seasonid = params.get("sid");
  const open = useSelector((state) => state.questionPaperModal.open);
  const sectionData = useSelector((state) => state.section.sectionData);
  const dispatch = useDispatch();
  const style = {
    posittion: "relative",
    bgcolor: "#EEEEEE",
    width: "60vw",
    height: "100vh",
    textAlign: "center",
    borderRadius: 5,
    overflow: "scroll",
  };
  useEffect(() => {
    const request = getSectionList();
    request(dispatch, seasonid);
  }, [seasonid, open]);

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Box sx={style}>
            <Typography variant="h4">Question Paper</Typography>
            {sectionData.map((data, id) => {
              return (
                <>
                  <br></br>
                  <Typography>
                    {data.data.name} [{data.data.max_marks} Marks]
                  </Typography>
                  <br></br>
                  <br></br>
                  <Box sx={{ textAlign: "left" }}>
                    {data.questions.map((question, id) => {
                      return (
                        <>
                          <Typography>
                            Assignees: [
                            {question.asignee.map((asignee, id) => {
                              return (
                                <Typography display="inline">
                                  {asignee.name},
                                </Typography>
                              );
                            })}
                            ]
                          </Typography>
                          <Typography inline>
                            {question.question_text}
                          </Typography>
                          <br></br>
                        </>
                      );
                    })}
                  </Box>
                </>
              );
            })}
          </Box>
        </Grid>
      </Modal>
    </div>
  );
};

export default QuestionPaperModal;
