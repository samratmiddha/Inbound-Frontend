import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useGridRegisterPipeApplier } from "@mui/x-data-grid/hooks/core/pipeProcessing";

export default function AddRoundForm(props) {
  let params = new URLSearchParams(window.location.search);
  const season = params.get("sid");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      season: season,
      type: "I",
    },
  });
  const cookie = document.cookie;
  const onSubmit = (data) => {
    console.log(data);
    BackendClient.post("rounds/", data).then((res) => {
      console.log(res);
      const handleClose = props.onClose;
      handleClose();
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
          label="Type"
          render={({ field: { value } }) => (
            <TextField select value={value} label="season type" margin="normal">
              <MenuItem value="I">Interview</MenuItem>
              <MenuItem value="P">Project</MenuItem>
              <MenuItem value="T">Test</MenuItem>
            </TextField>
          )}
        />
        {errors.type && <div class="error">This field is required</div>}
        <br></br>
        <label>Start Date</label>
        <input {...register("start_date")} type="date" />
        <br></br>
        <label>End Date</label>
        <input {...register("end_date")} type="date" />
        <br></br>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}
