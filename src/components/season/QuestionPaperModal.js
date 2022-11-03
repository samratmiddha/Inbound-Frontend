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
const QuestionPaperModal = () => {
  const roundId = useSelector((state) => state.roundTab.value);
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

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <div class="modal-class">
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box>
                <Typography variant="h4">Question Paper</Typography>
                <Button>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Button>
                Add section
              </Box>
            </Box>
            {sectionData.map((data, id) => {
              return (
                <>
                  <br></br>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", alignContent: "center" }}>
                      <Typography sx={{ alignSelf: "center" }}>
                        {data.data.name} [{data.data.max_marks} Marks]
                      </Typography>
                      <Button>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Button>
                      <Button
                        onClick={() => {
                          BackendClient.delete(
                            "sections/" + data.data.id + "/"
                          );
                        }}
                      >
                        <IconButton sx={{ color: "red" }}>
                          <DeleteIcon />
                        </IconButton>
                      </Button>
                      <Button>
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
                              <Button>
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
                        </Box>
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
