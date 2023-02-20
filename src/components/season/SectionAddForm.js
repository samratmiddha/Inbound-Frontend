import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSectionList from "../../requests/getSectionList";
import themes from "../../theme";
import getProjectCandidateList from "../../requests/getProjectCandidate";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import { setSectionData, setMarksData } from "../../features/panelModalSlice";

export default function AddSectionForm(props) {
  // if(props.fromPanel){
  // const roundId=useSelector((state)=>state.panelModal.round);
  // }
  const roundId = useSelector((state) => state.roundTab.value);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const roundData = useSelector((state) => state.roundTab.roundData);
  const theme = useSelector((state) => state.theme.theme);
  const request = getSectionList();
  const rounds = roundData.filter((round) => {
    return round.id === roundId;
  });
  const round = rounds[0];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      max_marks: 100,
      round: roundId,
    },
  });
  const onSubmit = async (data) => {
    BackendClient.post("sections/", data).then(async (res) => {
      if (props.fromPanel) {
        let sectionData = await BackendClient.get(
          "sections/?round=" + roundId
        ).then((res) => {
          return res.data;
        });
        dispatch(setSectionData(sectionData));
        let marksData = await BackendClient.get(
          "round_candidates/get_projects_by_round/" + roundId + "/"
        ).then((res) => {
          return res.data;
        });
        dispatch(setMarksData(marksData));
      } else {
        request(dispatch, roundId);
        if (round.type == "P" && user.year > 2) {
          const listRequest = getProjectCandidateList();
          listRequest(dispatch, roundId);
        } else {
          const listRequest = getRoundCandidateList();
          listRequest(dispatch, roundId, user.year, "", 100);
        }
      }
      props.handleClose();
    });
  };
  return (
    <div>
      <Typography varinat="h6" color="secondary">
        Add Section
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="name"
              size="small"
              margin="normal"
              color="secondary"
              sx={{ input: { color: "primary.contrastText" } }}
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes[theme].secondary.main },
              }}
              {...field}
            />
          )}
        />

        {errors.name && <div class="error">This field is required</div>}
        <br />
        <Controller
          name="max_marks"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              variant="outlined"
              size="small"
              label="Max Marks"
              margin="normal"
              color="secondary"
              sx={{ input: { color: "primary.contrastText" } }}
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes[theme].secondary.main },
              }}
              {...field}
            />
          )}
        />
        {errors.session && <div class="error">This field is required</div>}
        <br></br>
        <Controller
          name="round"
          control={control}
          render={({ field }) => <></>}
        />

        <br></br>
        <input
          type="submit"
          value="create"
          style={{ backgroundColor: themes[theme].secondary.main }}
        />
      </form>
    </div>
  );
}
