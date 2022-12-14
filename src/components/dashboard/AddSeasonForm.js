import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import getSeasonList from "../../requests/getSeasonList";
import { useDispatch, useSelector } from "react-redux";
import themes from "../../theme";
import theme from "../../theme";

export default function AddSeasonForm(props) {
  const theme = useSelector((state) => state.theme.theme);
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
  const dispatch = useDispatch();
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

    BackendClient.post("seasons/", data).then((res) => {
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
              sx={{ input: { color: "primary.contrastText" } }}
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
          name="ongoing"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox {...field} variant="outlined" color="secondary" />
          )}
        />
        {errors.isOngoing && <div class="error">This field is required</div>}

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
