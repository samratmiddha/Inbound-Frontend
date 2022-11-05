import {
  Modal,
  Grid,
  Box,
  Typography,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionPaperModalSlice";
import getSectionList from "../../requests/getSectionList";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
import BackendClient from "../../BackendClient";
import QuestionAddModal from "./QuestionAddModal";
import QuestionEditModal from "./QuestionEditModal";
import SectionAddModal from "./SectionAddModal";
import SectionEditModal from "./SectionEditModal";
import { setOpen as questionAddModalOpenFunction } from "../../features/questionAddModalSlice";
import { setOpen as questionEditModalOpenFunction } from "../../features/questionEditModalSlice";
import { setOpen as sectionEditModalOpenFunction } from "../../features/sectionEditModalSlice";
import { setOpen as sectionAddModalOpenFunction } from "../../features/sectionAddModalSlice";
const QuestionPaperModal = () => {
  const roundId = useSelector((state) => state.roundTab.value);
  const questionPaperModalopen = useSelector(
    (state) => state.questionPaperModal.open
  );
  const sectionData = useSelector((state) => state.section.sectionData);
  const questionEditModalOpen = useSelector(
    (state) => state.questionEditModal.open
  );
  const questionAddModalOpen = useSelector(
    (state) => state.questionAddModal.open
  );
  const sectionEditModalOpen = useSelector(
    (state) => state.sectionEditModal.open
  );
  const sectionAddModalOpen = useSelector(
    (state) => state.sectionAddModal.open
  );
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: "#EEEEEE",
    width: "60vw",
    height: "100vh",
    textAlign: "center",
    borderRadius: 5,
    overflowY: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 5,
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal
        open={questionPaperModalopen}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Typography variant="h4">Question Paper</Typography>
              <Button
                onClick={() => {
                  dispatch(sectionAddModalOpenFunction(true));
                }}
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Button>
              Add section
            </Box>
            <SectionAddModal />
          </Box>
          {sectionData.map((data, id) => {
            return (
              <>
                <br></br>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <SectionEditModal />
                  <Box sx={{ display: "flex", alignContent: "center" }}>
                    <QuestionAddModal
                      sectionId={data.data.id}
                      sectionName={data.data.name}
                    ></QuestionAddModal>
                    {console.log("yoyo", data.data.id)}
                    <Typography sx={{ alignSelf: "center" }}>
                      {data.data.name} [{data.data.max_marks} Marks]
                    </Typography>
                    <Button
                      onClick={() => {
                        console.log("qqq1");
                        dispatch(sectionEditModalOpenFunction(true));
                      }}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Button>
                    <Button
                      onClick={() => {
                        BackendClient.delete("sections/" + data.data.id + "/");
                      }}
                    >
                      <IconButton sx={{ color: "red" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(questionAddModalOpenFunction(true));
                      }}
                    >
                      <IconButton sx={{ color: "green" }}>
                        <AddIcon />
                      </IconButton>
                    </Button>
                  </Box>
                </Box>
                <br></br>
                <br></br>
                <Box sx={{ textAlign: "left" }}>
                  {data.questions.map((question, id) => {
                    return (
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
                          <Box>
                            <Button
                              onClick={() => {
                                dispatch(questionEditModalOpenFunction(true));
                              }}
                            >
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                              Edit
                            </Button>
                            <Button
                              sx={{ color: "red" }}
                              onClick={() => {
                                BackendClient.delete(
                                  "questions/" + question.id + "/"
                                );
                              }}
                            >
                              <IconButton sx={{ color: "red" }}>
                                <DeleteIcon />
                              </IconButton>
                              Delete
                            </Button>
                          </Box>
                        </Box>
                        <Typography>{question.question_text}</Typography>
                        <br></br>
                        <QuestionEditModal />
                      </Box>
                    );
                  })}
                </Box>
              </>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default QuestionPaperModal;
