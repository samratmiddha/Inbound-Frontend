import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import themes from "../../theme";
import BackendClient from "../../BackendClient";
import RoundMovePopover from "../season/RoundMovePopOver";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";

export default function Result(props) {
  const round = useSelector((state) => state.panelModal.round);
  const student = useSelector((state) => state.panelModal.student);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const roundInfo = await BackendClient.get(
      "round_candidates/?round=" + round + "&student=" + student
    ).then((res) => {
      return res.data;
    });
    for (let x in roundInfo) {
      let rmks = " ";
      if (roundInfo[x].remarks != null) {
        rmks = roundInfo[x].remarks + " ; " + data.comment;
      } else {
        rmks = data.comment;
      }
      BackendClient.patch("round_candidates/" + roundInfo[x].id + "/", {
        remarks: rmks,
      });
    }
  };
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Box
      sx={{
        backgroundColor: themes[theme].background.paper,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ alignSelf: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="comment"
            control={control}
            label="Comment"
            render={({ field }) => (
              <FormControl>
                <TextField
                  {...field}
                  multiline
                  labelId="Comment"
                  label="Comment"
                  size="large"
                  color="secondary"
                  sx={{
                    input: { color: "primary.contrastText" },
                    width: "50rem",
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
            value="evaluate"
            style={{
              backgroundColor: themes[theme].secondary.main,
              margin: "1.5rem",
            }}
          />
        </form>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="contained"
          color="green"
          size="large"
          sx={{ width: "8rem", alignSelf: "center", margin: "2.5rem" }}
          onClick={(event) => {
            dispatch(setAnchorEl(event.target));
          }}
        >
          <Typography sx={{ color: "#ffffff" }}> Move</Typography>
        </Button>
        <Button
          variant="contained"
          color="red"
          size="large"
          sx={{ width: "8rem", alignSelf: "center", margin: "2.5rem" }}
        >
          <Typography sx={{ color: "#ffffff" }}>Exterminate</Typography>
        </Button>
      </Box>
      <RoundMovePopover fromPanel={true} />
    </Box>
  );
}
