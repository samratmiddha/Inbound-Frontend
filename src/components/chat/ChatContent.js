import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import getChats from "../../requests/getChats";
import { setChatData } from "../../features/chatSlice";
import themes from "../../theme";

export default function ChatContent(props) {
  const user = useSelector((state) => state.user.username);
  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chatData);
  props.ws.onmessage = (event) => {
    console.log(event.data);
    let newobj = JSON.parse(event.data);
    let newobj2 = JSON.parse(newobj);
    console.log(newobj2, typeof newobj2);
    let sender = JSON.parse(newobj2.sender);
    console.log(sender, typeof sender);
    newobj2.sender = sender;
    console.log(newobj2);
    let newchats = [newobj2, ...chats];
    console.log(newchats, "mnmnmnm");
    dispatch(setChatData(newchats));
  };

  // console.log("lllll", chats);
  // let chat2 = [];
  // // chat2 = Array.from(chat2);
  // console.log(chat2, typeof chat2, "kkkkkk");
  // for (let x in chats) {
  //   chat2.push(chats[x]);
  // }
  // console.log(chat2, typeof chat2);
  useEffect(() => {
    const request = getChats();
    request(dispatch);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
    reset();
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 5,
        width: "95vw",
        height: "90vh",

        bottom: "0",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          position: "relative",
          height: "92%",
          display: "flex",
          flexDirection: "column-reverse",
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
                {console.log("yoyoyo", chat)}
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
      <Box sx={{ postion: "fixed", zIndex: "2", bottom: "0", height: "8%" }}>
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
                color="secondary"
                sx={{
                  width: "90%",
                  input: {
                    color: "primary.contrastText",
                  },
                  borderColor: themes[theme].secondary.main,
                }}
                {...field}
              />
            )}
          />
          <input
            type="submit"
            value="Send"
            style={{
              backgroundColor: themes[theme].secondary.main,
              color: themes[theme].secondary.contrastText,
            }}
          />
          {errors.location && <div class="error">This field is required</div>}
        </form>
      </Box>
    </Box>
  );
}
