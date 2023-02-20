import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/questionPaperModalSlice";
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
import { setSectionData } from "../../features/sectionEditModalSlice";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { setQuestionData } from "../../features/questionEditModalSlice";
import { changeSectionValue } from "../../features/sectionSlice";
import themes from "../../theme";

const QuestionPaperModal = () => {
  const theme = useSelector((state) => state.theme.theme);
  const questionPaperModalopen = useSelector(
    (state) => state.questionPaperModal.open
  );
  const sectionData = useSelector((state) => state.section.sectionData);
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (name.split(" ")[1]) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
      };
    }
  }

  const dispatch = useDispatch();
  const style = {
    position: "relative",
    backgroundColor: themes[theme].primary.main,
    color: themes[theme].primary.contrastText,
    width: "60vw",
    height: "100vh",
    textAlign: "center",
    borderRadius: 5,
    overflowY: "auto",
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
        {/* <ThemeProvider theme={theme}> */}
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
                  <AddIcon sx={{ color: themes[theme].secondary.main }} />
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
                    <Typography sx={{ alignSelf: "center" }}>
                      {data.data.name} [{data.data.max_marks} Marks]
                    </Typography>
                    <Button
                      onClick={() => {
                        dispatch(sectionEditModalOpenFunction(true));
                        dispatch(setSectionData(data.data));
                      }}
                    >
                      <IconButton>
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Button>
                    <Button
                      onClick={() => {
                        BackendClient.delete("sections/" + data.data.id + "/");
                      }}
                    >
                      <IconButton color="red">
                        <DeleteIcon />
                      </IconButton>
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(questionAddModalOpenFunction(true));
                        dispatch(changeSectionValue(data));
                      }}
                    >
                      <IconButton color="green">
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
                      <Box
                        sx={{
                          // backgroundColor: "#f0f2f5",
                          marginBottom: "1rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignContent: "center" }}>
                            <Typography
                              sx={{
                                alignSelf: "center",
                                marginRight: "1rem",
                              }}
                            >
                              Assignees:
                            </Typography>
                            <AvatarGroup max={4}>
                              {question.asignee.map((asignee, id) => {
                                return (
                                  <Avatar {...stringAvatar(asignee.name)} />
                                );
                              })}
                            </AvatarGroup>
                          </Box>
                          <Box>
                            <Typography variant="h6">
                              {question.question_name}
                            </Typography>
                          </Box>
                          <Box>
                            <Button
                              onClick={() => {
                                dispatch(questionEditModalOpenFunction(true));
                                dispatch(setQuestionData(question));
                              }}
                              sx={{
                                color: themes[theme].secondary.main,
                              }}
                            >
                              <IconButton
                                sx={{
                                  color: themes[theme].secondary.main,
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              Edit
                            </Button>
                            <Button
                              color="red"
                              onClick={() => {
                                BackendClient.delete(
                                  "questions/" + question.id + "/"
                                );
                              }}
                            >
                              <IconButton color="red">
                                <DeleteIcon />
                              </IconButton>
                              Delete
                            </Button>
                          </Box>
                        </Box>
                        <hr></hr>
                        <Typography>{question.question_text}</Typography>
                        <br></br>
                      </Box>
                    );
                  })}
                </Box>
                <QuestionEditModal />
                <QuestionAddModal></QuestionAddModal>
              </>
            );
          })}
        </Box>
        {/* </ThemeProvider> */}
      </Modal>
    </div>
  );
};

export default QuestionPaperModal;
