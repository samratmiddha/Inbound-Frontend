import {
  Box,
  Popover,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import getChats from "../../requests/getChats";
import themes from "../../theme";

export default function ChatPopOver(props) {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.username);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    BackendClient.get("/chats/?panel=" + props.panel).then((res) => {
      setChats(res.data);
    });
  }, []);
  props.ws.onmessage = (event) => {
    let newobj = JSON.parse(event.data);
    let newobj2 = JSON.parse(newobj.data);
    let sender = JSON.parse(newobj2.sender);
    newobj2.sender = sender;
    let newchats = [newobj2, ...chats];
    setChats(newchats);
  };
  const handleClose = () => {
    props.setAnchorEl(null);
  };
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const open = Boolean(props.anchorEl);
  const onSubmit = (data) => {
    console.log(data);
    let final_data = { ...data, sender: user, panel: props.panel };
    console.log(final_data);
    let json_data = JSON.stringify(final_data);
    props.ws.send(json_data);
    reset();
  };
  return (
    <Popover
      id="ChatPopOver"
      open={open}
      anchorEl={props.anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ width: "30rem", minHeight: "55rem" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column-reverse",
            padding: "1rem",
          }}
        >
          {chats.map((chat, id) => {
            return (
              <Box sx={{ marginBottom: "1rem" }}>
                <Box
                  component="span"
                  sx={{
                    backgroundColor: themes[theme].secondary.main,
                    padding: "0rem 1rem",
                    display: "inline-block",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: themes[theme].secondary.contrastText,
                      marginBottom: "0.25rem",
                      fontWeight: "bold",
                    }}
                  >
                    {chat.sender.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: themes[theme].secondary.contrastText }}
                  >
                    {chat.message}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ position: "absolute", bottom: "0.5rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="message"
              control={control}
              label="Message"
              render={({ field }) => (
                <FormControl>
                  <TextField
                    {...field}
                    multiline
                    labelId="Message"
                    label="Message"
                    size="large"
                    color="secondary"
                    sx={{
                      input: { color: "primary.contrastText" },
                      width: "20rem",
                      margin: "1.5rem",
                    }}
                    InputProps={{
                      style: { color: themes[theme].primary.contrastText },
                    }}
                    InputLabelProps={{
                      style: { color: themes[theme].secondary.main },
                    }}
                  ></TextField>
                </FormControl>
              )}
            />

            <input
              type="submit"
              value="send"
              style={{
                backgroundColor: themes[theme].secondary.main,
                margin: "1.5rem 0rem",
              }}
            />
          </form>
        </Box>
      </Box>
    </Popover>
  );
}
