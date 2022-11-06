import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSeasonList from "../../requests/getSeasonList";

export default function EditSeasonForm(props) {
  console.log(props, "oooo");
  const dispatch = useDispatch();
  const seasonCard = useSelector((state) => state.season.seasonCard);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_ongoing: seasonCard.ongoing,
      session: seasonCard.session,
      season_type: seasonCard.season_type,
      name: seasonCard.name,
    },
  });
  const onSubmit = (data) => {
    BackendClient.patch("seasons/" + seasonCard.sid + "/", data).then((res) => {
      console.log(res);
      const handleClose = props.onClose;
      handleClose();
      const request = getSeasonList();
      request(dispatch);
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
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              label="season type"
              margin="normal"
            >
              <MenuItem value="designer">design</MenuItem>
              <MenuItem value="developer">Development</MenuItem>
            </Select>
          )}
        />
        {errors.season_type && <div class="error">This field is required</div>}
        <br></br>
        <br></br>
        <label>Ongoing</label>
        <Controller
          name="is_ongoing"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              variant="outlined"
              color="secondary"
            />
          )}
        />
        {errors.is_ongoing && <div class="error">This field is required</div>}

        <br></br>
        <input type="submit" value="commit" />
      </form>
    </div>
  );
}
