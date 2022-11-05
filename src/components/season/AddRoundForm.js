import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import BackendClient from "../../BackendClient";
import { Select, TextField, InputLabel } from "@mui/material";
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
          render={({ field: { onChange, value } }) => (
            <Select
              label="Type"
              value={value}
              margin="normal"
              onChange={onChange}
            >
              <MenuItem value="IT">Tech Interview</MenuItem>
              <MenuItem value="IH">HR Interview</MenuItem>
              <MenuItem value="P">Project</MenuItem>
              <MenuItem value="T">Test</MenuItem>
            </Select>
          )}
        />
        {errors.type && <div class="error">This field is required</div>}
        <br></br>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}
