import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { FormControl, TextareaAutosize, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import getSectionList from "../../requests/getSectionList";
import themes from "../../theme";
import { Typography } from "@mui/material";

export default function AddQuestionForm(props) {
  const users = useSelector((state) => state.userList.userListData);
  const theme = useSelector((state) => state.theme.theme);
  const section = useSelector((state) => state.section.value);
  const round_id = useSelector((state) => state.roundTab.value);
  const dispatch = useDispatch();
  const request = getSectionList();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      section: section.data.id,
      asignee: [],
    },
  });
  const onSubmit = (data) => {
    BackendClient.post("questions/", data).then(() => {
      request(dispatch, round_id);
      props.handleClose();
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography varinat="h3" color="secondary">
        Add Question
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="question_name"
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
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: themes[theme].secondary.main },
              }}
              {...field}
            />
          )}
        />

        {errors.question_text && (
          <div class="error">This field is required</div>
        )}
        <br />
        <Controller
          name="section"
          control={control}
          render={({ field }) => <></>}
        />
        <Controller
          name="question_text"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextareaAutosize
              minRows={10}
              placeholder="Enter Question Text Here"
              style={{
                input: {
                  color: "primary.contrastText",
                },
                width: "80%",
              }}
              InputProps={{
                style: { color: themes[theme].primary.contrastText },
              }}
              {...field}
            />
          )}
        />

        {errors.question_text && (
          <div class="error">This field is required</div>
        )}
        <br />
        <Controller
          name="asignee"
          control={control}
          label="Asignees"
          render={({ field }) => (
            <FormControl>
              <Select
                {...field}
                labelId="asignees"
                label="asignees"
                multiple
                size="small"
                color="secondary"
                sx={{
                  input: {
                    color: themes[theme].primary.contrastText,
                  },
                }}
                InputProps={{
                  style: { color: themes[theme].primary.contrastText },
                }}
                InputLabelProps={{
                  style: { color: themes[theme].secondary.main },
                }}
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
        <input
          type="submit"
          value="create"
          style={{ backgroundColor: themes[theme].secondary.main }}
        />
      </form>
    </div>
  );
}
