import {
  Box,
  Modal,
  Typography,
  TextField,
  FormControl,
  MenuItem,
} from "@mui/material";
import { height } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import themes from "../../theme";
import BackendClient from "../../BackendClient";
import {
  setOpen,
  setStudent,
  setRound,
  setStudentData,
  setRoundData,
  setSectionData,
  setMarksData,
} from "../../features/panelModalSlice";
import { useEffect, useState } from "react";
import getRoundList from "../../requests/getRoundList";
import { resetTimer } from "../../features/panelModalSlice";

export default function BeginPanelModal(props) {
  const rounds_request = getRoundList();

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const rounds = useSelector((state) => state.roundTab.roundData);
  const [studentList, changeStudentList] = useState([]);
  useEffect(() => {
    rounds_request(dispatch, props.season_id);
  }, []);
  props.ws.onmessage = async (event) => {
    let event_data_object = JSON.parse(event.data);
    if (event_data_object.data.panel == props.id) {
      BackendClient.get("panels/" + props.id + "/").then((res1) => {
        setValue("round", res1.data.current_round.id);
        BackendClient.get(
          "round_candidates/?round=" + res1.data.current_round.id
        ).then((res) => {
          let List = [];
          for (let x in res.data) {
            List.push(res.data[x].student);
          }
          changeStudentList(List);
          setValue("student", res1.data.current_student.id);
        });
      });
    }
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const onSubmit = async (data) => {
    let current_date = new Date();
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
      "sectional_marks/?section__round=" +
        data.round +
        "&student=" +
        data.student
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
    BackendClient.patch("panels/" + props.id + "/", {
      current_student: data.student,
      start_time: current_date,
      current_round: data.round,
    });
    handleClose();
    dispatch(resetTimer());
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      student: null,
      round: null,
    },
  });
  useEffect(() => {
    BackendClient.get("panels/" + props.id + "/").then((res1) => {
      setValue("round", res1.data.current_round.id);
      BackendClient.get(
        "round_candidates/?round=" + res1.data.current_round.id
      ).then((res) => {
        let List = [];
        for (let x in res.data) {
          List.push(res.data[x].student);
        }
        changeStudentList(List);
        setValue("student", res1.data.current_student.id);
      });
    });
  }, []);
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          position: "relative",
          width: "40rem",
          height: "30rem",
          backgroundColor: "background.paper",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" color="secondary">
          Panel
        </Typography>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="round"
              control={control}
              label="Round"
              render={({ field }) => (
                <FormControl>
                  <TextField
                    select
                    {...field}
                    labelId="Round"
                    label="Round"
                    size="large"
                    color="secondary"
                    sx={{
                      input: { color: "primary.contrastText" },
                      width: "20rem",
                      margin: "1.5rem",
                    }}
                    InputProps={{
                      style: { color: themes[theme].primary.contrastText },
                    }}
                    InputLabelProps={{
                      style: { color: themes[theme].secondary.main },
                    }}
                    onChange={async (event) => {
                      field.onChange(event);
                      let data = await BackendClient.get(
                        "round_candidates/?round=" + event.target.value
                      ).then((res) => {
                        return res.data;
                      });
                      let List = [];
                      for (let x in data) {
                        List.push(data[x].student);
                      }
                      changeStudentList(List);
                    }}
                  >
                    {rounds.map((round, id) => {
                      if (round.name != null) {
                        return (
                          <MenuItem
                            value={round.id}
                            key={round.id}
                            sx={{ color: "primary.contrastText" }}
                          >
                            {round.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </TextField>
                </FormControl>
              )}
            />
            <br></br>
            <Controller
              name="student"
              control={control}
              label="Student"
              render={({ field }) => (
                <FormControl>
                  <TextField
                    select
                    {...field}
                    labelId="Student"
                    label="Student"
                    size="large"
                    color="secondary"
                    sx={{
                      input: { color: "primary.contrastText" },
                      margin: "1.5rem",
                      width: "20rem",
                    }}
                    InputProps={{
                      style: { color: themes[theme].primary.contrastText },
                    }}
                    InputLabelProps={{
                      style: { color: themes[theme].secondary.main },
                    }}
                  >
                    {studentList.map((student, id) => {
                      if (student.name != null) {
                        return (
                          <MenuItem
                            value={student.id}
                            key={student.id}
                            sx={{ color: "primary.contrastText" }}
                          >
                            {student.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </TextField>
                </FormControl>
              )}
            />
            <br></br>

            <input
              type="submit"
              value="begin"
              style={{ backgroundColor: themes[theme].secondary.main }}
            />
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
