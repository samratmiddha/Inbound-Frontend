import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import themes from "../../theme";

export default function RoundComments(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("/student/1");
  };
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ alignSelf: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="Comment"
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
        >
          Move
        </Button>
        <Button
          variant="contained"
          color="red"
          size="large"
          sx={{ width: "8rem", alignSelf: "center", margin: "2.5rem" }}
        >
          Exterminate
        </Button>
      </Box>
    </Box>
  );
}
