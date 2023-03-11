import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import themes from "../../theme";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BackendClient from "../../BackendClient";

export default function SectionCard(props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setValue("marks", props.sectionData.marks);
    setValue("comment", props.sectionData.comment);
  }, []);

  const onSubmit = (data) => {
    BackendClient.patch("sectional_marks/" + props.sectionData.id + "/", data);
  };
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Card sx={{ margin: "2rem", padding: "2rem" }}>
      <CardActionArea>
        <Typography variant="h6" color="primary.contrastText">
          {props.sectionData.section.name}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="marks"
            control={control}
            label="Marks"
            render={({ field }) => (
              <FormControl>
                <TextField
                  {...field}
                  labelId="Marks"
                  label="marks"
                  size="large"
                  color="secondary"
                  sx={{
                    input: { color: "primary.contrastText" },
                    width: "10rem",
                    margin: "1.5rem 0rem",
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
                    width: "30rem",
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
          <br></br>

          <input
            type="submit"
            value="evaluate"
            style={{ backgroundColor: themes[theme].secondary.main }}
          />
        </form>
      </CardActionArea>
    </Card>
  );
}
