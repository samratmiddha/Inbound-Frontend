import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormControl } from "@mui/material";
import themes from "../../theme";
import getPanelList from "../../requests/getPanelList";

export default function AddPanelForm(props) {
  const sid = useSelector((state) => state.season.value);
  const username = useSelector((state) => state.user.username);
  const users = useSelector((state) => state.userList.userListData);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
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
  const onSubmit = (data) => {
    BackendClient.post("panels/", data).then((res) => {
      const handleClose = props.onClose;
      handleClose();
      const request = getPanelList();
      request(dispatch, sid);
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
              color="secondary"
              disabled={false}
              InputLabelProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              sx={{ input: { color: "primary.contrastText" } }}
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
            <TextField
              select
              value={value}
              label="panel type"
              margin="normal"
              color="secondary"
              InputLabelProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              sx={{
                color: "primary.contrastText",
                width: "14rem",
                input: { color: "primary.contrastText" },
              }}
            >
              <MenuItem value="tech" sx={{ color: "primary.contrastText" }}>
                Tech
              </MenuItem>
              <MenuItem value="hr" sx={{ color: "primary.contrastText" }}>
                HR
              </MenuItem>
            </TextField>
          )}
        />
        {errors.type && <div class="error">This field is required</div>}
        <br />
        <Controller
          name="members"
          control={control}
          label="members"
          render={({ field }) => (
            <FormControl>
              <Select
                {...field}
                labelId="members"
                label="members"
                multiple
                size="small"
                color="secondary"
                sx={{ color: "primary.contrastText", width: "14rem" }}
              >
                {users.map((user, id) => {
                  if (user.name != null) {
                    return (
                      <MenuItem
                        value={user.username}
                        key={user.username}
                        sx={{ color: "primary.contrastText" }}
                      >
                        {user.name}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          )}
        />
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
        <input
          type="submit"
          value="create"
          style={{ backgroundColor: themes[theme].secondary.main }}
        />
      </form>
    </div>
  );
}
