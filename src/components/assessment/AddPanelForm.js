import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function AddPanelForm(props) {
  const sid = useSelector((state) => state.season.value);
  const username = useSelector((state) => state.user.username);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      season: sid,
      is_active: false,
      type: "tech",
      members: [username],
    },
  });
  const cookie = document.cookie;
  const onSubmit = (data) => {
    BackendClient.post("panels/", data).then((res) => {
      console.log(res);
      const handleClose = props.onClose;
      handleClose();
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="location"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Location"
              size="small"
              margin="normal"
              {...field}
            />
          )}
        />

        {errors.location && <div class="error">This field is required</div>}
        <br />

        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          label="Panel type"
          render={({ field: { value } }) => (
            <TextField select value={value} label="season type" margin="normal">
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
            </TextField>
          )}
        />
        {errors.type && <div class="error">This field is required</div>}
        <br></br>
        <br></br>
        <label>Active</label>
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <Checkbox {...field} variant="outlined" color="secondary" />
          )}
        />
        {errors.isOngoing && <div class="error">This field is required</div>}

        <br></br>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}
