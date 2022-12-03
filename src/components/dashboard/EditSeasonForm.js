import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSeasonList from "../../requests/getSeasonList";
import themes from "../../theme";

export default function EditSeasonForm(props) {
  console.log(props, "oooo");
  const dispatch = useDispatch();
  const seasonCard = useSelector((state) => state.season.seasonCard);
  const theme = useSelector((state) => state.theme.theme);
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
              color="secondary"
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
              color="secondary"
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
          name="season_type"
          control={control}
          rules={{ required: true }}
          label="sesaon type"
          render={({ field: { value, onChange } }) => (
            <TextField
              select
              value={value}
              onChange={onChange}
              label="season type"
              margin="normal"
              color="secondary"
              sx={{ input: { color: "primary.contrastText" } }}
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes[theme].secondary.contrastText },
              }}
            >
              <MenuItem value="designer" sx={{ color: "primary.contrastText" }}>
                design
              </MenuItem>
              <MenuItem
                value="developer"
                sx={{ color: "primary.contrastText" }}
              >
                Development
              </MenuItem>
            </TextField>
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
        <input
          type="submit"
          value="commit"
          style={{ backgroundColor: themes[theme].secondary.contrastText }}
        />
      </form>
    </div>
  );
}
