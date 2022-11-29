import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  setStudent,
  setRound,
  setStudentData,
  setRoundData,
  setSectionData,
  setMarksData,
} from "../../features/panelModalSlice";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
  TextField,
  stepButtonClasses,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import { MarkunreadSharp } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

export default function PanelModal() {
  let rows = [];
  let columns = [];
  const open = useSelector((state) => state.panelModal.open);
  const seasonId = useSelector((state) => state.season.value);
  const rounds = useSelector((state) => state.roundTab.roundData);
  console.log(rounds, "iiiiii");
  const dispatch = useDispatch();
  const handleClose = () => {
    console.log("kyun nahi ho raha");
    dispatch(setOpen(false));
  };
  const onSubmit = async (data) => {
    dispatch(setStudent(data.student));
    dispatch(setRound(data.round));
    let StudentData = await BackendClient.get(
      "candidates/" + data.student + "/"
    ).then((res) => {
      return res.data;
    });
    dispatch(setStudentData(StudentData));
    let RoundData = await BackendClient.get(
      "round_candidates/?student=" + data.student
    ).then((res) => {
      return res.data;
    });
    dispatch(setRoundData(RoundData));
    let sectionData = await BackendClient.get(
      "sections/?round=" + data.round
    ).then((res) => {
      return res.data;
    });
    dispatch(setSectionData(sectionData));
    let marksData = await BackendClient.get(
      "round_candidates/get_projects_by_round/" + data.round + "/"
    ).then((res) => {
      return res.data;
    });
    dispatch(setMarksData(marksData));
  };
  const style = {
    position: "relative",
    bgcolor: "#EEEEEE",
    width: 900,
    height: 800,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    borderRadius: 5,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      student: null,
      round: null,
    },
  });
  const {
    control: control2,
    handleSubmit: handleCommentSubmit,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {},
  });
  const [studentList, changeStudentList] = useState([]);
  const studentData = useSelector((state) => state.panelModal.studentData);
  const sectionData = useSelector((state) => state.panelModal.sectionData);
  const marksData = useSelector((state) => state.panelModal.marksData);
  const student = useSelector((state) => state.panelModal.student);
  const roundData = useSelector((state) => state.panelModal.roundData);
  const round = useSelector((state) => state.panelModal.round);
  let column = {};
  let row = {};
  for (let x in sectionData) {
    column = [];
    column = {
      field: sectionData[x].name,
      headerName: sectionData[x].name,
      editable: "true",
    };
    columns.push(column);
  }
  for (let x in marksData) {
    if (marksData[x].student_id == student) {
      rows.push(marksData[x]);
    }
  }
  console.log(columns, "lklklkl");
  console.log(rows, "jjjjj");
  const onCommentSubmit = async (data) => {
    console.log(data, "kkk");
    const roundInfo = await BackendClient.get(
      "round_candidates/?round=" + round + "&student=" + student
    ).then((res) => {
      return res.data;
    });
    for (let x in roundInfo) {
      BackendClient.patch("round_candidates/" + roundInfo[x].id + "/", {
        remarks: data.message,
      });
    }
  };
  return (
    <Modal onClose={handleClose} open={open} onBackdropClick={handleClose}>
      <Box sx={style}>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="round"
              control={control}
              label="Round"
              render={({ field }) => (
                <FormControl>
                  <Select
                    {...field}
                    labelId="Round"
                    label="Round"
                    size="small"
                    onChange={async (event) => {
                      field.onChange(event);
                      let data = await BackendClient.get(
                        "round_candidates/?round=" + event.target.value
                      ).then((res) => {
                        console.log("ooooo", res.data);
                        return res.data;
                      });
                      let List = [];
                      for (let x in data) {
                        console.log("hooo");
                        List.push(data[x].student);
                      }
                      changeStudentList(List);
                      console.log(studentList, "uuuuu");
                    }}
                  >
                    {rounds.map((round, id) => {
                      if (round.name != null) {
                        return (
                          <MenuItem value={round.id} key={round.id}>
                            {round.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="student"
              control={control}
              label="Student"
              render={({ field }) => (
                <FormControl>
                  <Select
                    {...field}
                    labelId="Student"
                    label="Student"
                    size="small"
                  >
                    {studentList.map((student, id) => {
                      if (student.name != null) {
                        return (
                          <MenuItem value={student.id} key={student.id}>
                            {student.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              )}
            />
            <br></br>

            <input type="submit" value="begin" />
          </form>
        </Box>
        <Box>
          <Typography variant="h4">Report</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "60%",
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              <>
                <Typography variant="h6">Name : </Typography>
                <Typography display="inline">{studentData.name} </Typography>
              </>
              <>
                <Typography variant="h6">Email : </Typography>
                <Typography>{studentData.email} </Typography>
              </>
              <>
                <Typography variant="h6">CG : </Typography>
                <Typography>{studentData.CG} </Typography>
              </>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "60%",
                alignSelf: "center",
              }}
            >
              <>
                <Typography variant="h6">Branch : </Typography>
                <Typography>{studentData.branch} </Typography>
              </>
              <>
                <Typography variant="h6">Mobile No : </Typography>
                <Typography>{studentData.mobile_no} </Typography>
              </>
              <>
                <Typography variant="h6">Year : </Typography>
                <Typography>{studentData.year} </Typography>
              </>
            </Box>
          </Box>
        </Box>
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
            rowsPerPageOptions={[10]}
            hideFooter={true}
          ></DataGrid>
        </Box>
        <Box>
          <Typography variant="h6">Comments</Typography>
          {roundData.map((round, id) => {
            return (
              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography sx={{ display: "inline" }}>
                  {round.round.name} :
                </Typography>
                <Typography sx={{ display: "inline" }}>
                  {round.remarks}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box>
          <form onSubmit={handleCommentSubmit(onCommentSubmit)}>
            <Controller
              name="message"
              control={control2}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Message"
                  size="small"
                  margin="normal"
                  sx={{ width: "80%" }}
                  {...field}
                />
              )}
            />
            <input type="submit" value="Send" />
            {errors.location && <div class="error">This field is required</div>}
          </form>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button sx={{ color: "green" }}>Move</Button>
          <Button sx={{ color: "red" }}>Exterminate</Button>
        </Box>
      </Box>
    </Modal>
  );
}
