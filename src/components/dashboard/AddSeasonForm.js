import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";

export default function AddSeasonForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ongoing: true,
      session: new Date().getFullYear(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    BackendClient.post("seasons/", data, {
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Season Name</label>
        <br></br>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} />}
        />

        {errors.name && <div class="error">This field is required</div>}
        <br />
        <label>Session</label>
        <br></br>
        <Controller
          name="session"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.session && <div class="error">This field is required</div>}
        <br></br>
        <label>Season Status</label>
        <br></br>
        <label>Ongoing</label>
        <Controller
          name="ongoing"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Checkbox {...field} />}
        />
        {errors.isOngoing && <div class="error">This field is required</div>}
        <br></br>
        <label>Season Type</label>
        <Controller
          name="season_type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="designer"
              label="Age"
              {...field}
            >
              <MenuItem value="designer">design</MenuItem>
              <MenuItem value="developer">Development</MenuItem>
            </Select>
          )}
        />
        {errors.isOngoing && <div class="error">This field is required</div>}
        <br></br>
        <input type="submit" />
      </form>
    </div>
  );
}
