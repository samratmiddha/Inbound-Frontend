import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function ChatContent(props) {
  let chats = props.chats;
  const user = useSelector((state) => state.user.username);
  props.ws.onmessage = (event) => {
    console.log("pppppppppppp", event);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (data) => {
    data = { ...data, sender: user };
    let json_data = JSON.stringify(data);
    console.log(json_data);
    props.ws.send(json_data);
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 5,
        width: "95vw",
        height: "90vh",
      }}
    >
      <Box>{console.log(chats)}</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Message"
              size="small"
              margin="normal"
              {...field}
            />
          )}
        />
        <input type="submit" value="Send" />
        {errors.location && <div class="error">This field is required</div>}
      </form>
    </Box>
  );
}
