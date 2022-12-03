import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSectionList from "../../requests/getSectionList";
import themes from "../../theme";

export default function AddSectionForm(props) {
  const roundId = useSelector((state) => state.roundTab.value);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const request = getSectionList();
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
  const onSubmit = (data) => {
    console.log("exe", data);
    BackendClient.post("sections/", data);
    request(dispatch, roundId);
  };
  return (
    <div>
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
                style: { color: themes[theme].secondary.contrastText },
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
                style: { color: themes[theme].secondary.contrastText },
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
          style={{ backgroundColor: themes[theme].secondary.contrastText }}
        />
      </form>
    </div>
  );
}
