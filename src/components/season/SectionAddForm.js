import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function AddSectionForm(props) {
  const roundId = useSelector((state) => state.roundTab.value);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      max_marks: 100,
      round: roundId,
    },
  });
  const onSubmit = (data) => {
    console.log("exe", data);
    BackendClient.post("sections/", data);
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
          name="max_marks"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              variant="outlined"
              size="small"
              label="Max Marks"
              margin="normal"
              {...field}
            />
          )}
        />
        {errors.session && <div class="error">This field is required</div>}
        <br></br>
        <Controller
          name="round"
          control={control}
          render={({ field }) => <></>}
        />

        <br></br>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}
