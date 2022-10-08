import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";

export default function AddSeasonForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ongoing: true,
      session: new Date().getFullYear(),
      season_type: "designer",
    },
  });
  const cookie = document.cookie;
  const onSubmit = (data) => {
    console.log(data);
    console.log(cookie);
    const senddata = JSON.stringify(data);
    // BackendClient.post("seasons/", data, {
    //   headers: {
    //     cookie:
    //       "sessionid=" +
    //       document.cookie.match("sessionid") +
    //       "csrftoken=" +
    //       document.cookie.match("csrftoken"),
    //   },
    // });

    BackendClient.post("seasons/", data);
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
              {...field}
            />
          )}
        />

        {errors.name && <div class="error">This field is required</div>}
        <br />
        <Controller
          name="session"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              type="number"
              variant="outlined"
              size="small"
              label="session"
              margin="normal"
              {...field}
            />
          )}
        />
        {errors.session && <div class="error">This field is required</div>}
        <br></br>
        <Controller
          name="season_type"
          control={control}
          rules={{ required: true }}
          label="sesaon type"
          render={({ field: { value } }) => (
            <TextField select value={value} label="season type" margin="normal">
              <MenuItem value="designer">design</MenuItem>
              <MenuItem value="developer">Development</MenuItem>
            </TextField>
          )}
        />
        {errors.season_type && <div class="error">This field is required</div>}
        <br></br>
        <br></br>
        <label>Ongoing</label>
        <Controller
          name="ongoing"
          control={control}
          rules={{ required: true }}
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
