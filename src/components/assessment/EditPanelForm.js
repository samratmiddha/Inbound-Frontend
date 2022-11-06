import { useForm, Controller } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSeasonList from "../../requests/getSeasonList";
import getPanelList from "../../requests/getPanelList";

export default function EditPanelForm(props) {
  const sid = useSelector((state) => state.season.value);
  const username = useSelector((state) => state.user.username);
  const panel = useSelector((state) => state.panelEditModal.panelData);
  const users = useSelector((state) => state.userList.userListData);
  const dispatch = useDispatch();
  let members = [];
  for (var x in panel.members) {
    members.push(panel.members[x].username);
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      season: panel.season,
      is_active: panel.is_active,
      type: panel.type,
      members: members,
      location: panel.location,
      //   members: members,
    },
  });
  const onSubmit = (data) => {
    BackendClient.patch("panels/" + panel.id + "/", data).then((res) => {
      console.log(res);
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
              >
                {users.map((user, id) => {
                  if (user.name != null) {
                    return (
                      <MenuItem value={user.username} key={user.username}>
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
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              variant="outlined"
              color="secondary"
            />
          )}
        />
        {errors.isOngoing && <div class="error">This field is required</div>}

        <br></br>
        <input type="submit" value="commit" />
      </form>
    </div>
  );
}
