import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import BackendClient from "../../BackendClient";
import { Select, TextField, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGridRegisterPipeApplier } from "@mui/x-data-grid/hooks/core/pipeProcessing";
import getRoundList from "../../requests/getRoundList";
import themes from "../../theme";

export default function AddRoundForm(props) {
  let params = new URLSearchParams(window.location.search);
  const season = params.get("sid");
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      season: season,
      type: "IT",
    },
  });
  const cookie = document.cookie;
  const onSubmit = (data) => {
    console.log(data);
    BackendClient.post("rounds/", data).then((res) => {
      console.log(res);
      const handleClose = props.onClose;
      handleClose();
      const request = getRoundList();
      request(dispatch, season);
    });
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
              label="Name"
              size="small"
              margin="normal"
              color="secondary"
              sx={{ input: { color: "primary.contrastText" } }}
              InputProps={{
                style: { color: themes["Dark"].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes["Dark"].secondary.contrastText },
              }}
              {...field}
            />
          )}
        />

        {errors.name && <div class="error">This field is required</div>}
        <br />

        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              label="Type"
              value={value}
              margin="normal"
              onChange={onChange}
              color="secondary"
              sx={{ input: { color: "primary.contrastText" } }}
              InputProps={{
                style: { color: themes["Dark"].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes["Dark"].secondary.contrastText },
              }}
            >
              <MenuItem value="IT" sx={{ color: "primary.contrastText" }}>
                Tech Interview
              </MenuItem>
              <MenuItem value="IH" sx={{ color: "primary.contrastText" }}>
                HR Interview
              </MenuItem>
              <MenuItem value="P" sx={{ color: "primary.contrastText" }}>
                Project
              </MenuItem>
              <MenuItem value="T" sx={{ color: "primary.contrastText" }}>
                Test
              </MenuItem>
            </TextField>
          )}
        />
        {errors.type && <div class="error">This field is required</div>}
        <br></br>
        <input
          type="submit"
          value="create"
          style={{ backgroundColor: themes["Dark"].secondary.contrastText }}
        />
      </form>
    </div>
  );
}
