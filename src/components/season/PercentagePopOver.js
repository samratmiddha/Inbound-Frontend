import { Button, Box, List, Select, MenuItem } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/filterPopOverSlice";
import { useForm, Controller } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import themes from "../../theme";

export default function PercentagePopOver(props) {
  const round_id = useSelector((state) => state.roundTab.value);
  const user_year = useSelector((state) => state.user.year);
  const theme = useSelector((state) => state.theme.theme);
  let anchorEl = props.anchorEl;
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const filterid = props.open ? "simple" : undefined;
  const handleFilterClose = () => {
    props.setPopOverOpen(false);
  };
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      field: "total_marks",
      percent: 100,
    },
  });
  const request = getRoundCandidateList();
  const onSubmit = (data) => {
    console.log(data);

    request(dispatch, round_id, user_year, data.field, data.percent);
  };
  return (
    <Popover
      id={filterid}
      open={props.open}
      anchorEl={anchorEl.current}
      onClose={handleFilterClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{ color: "primary.contrastText" }}
    >
      <Box sx={{ display: "flex", alignContent: "center", padding: "2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="field"
            control={control}
            label="Field"
            render={({ field }) => (
              <FormControl>
                <TextField
                  {...field}
                  select
                  labelId="field"
                  label="field"
                  size="small"
                  color="secondary"
                  sx={{ input: { color: "primary.contrastText" } }}
                  InputProps={{
                    style: { color: themes[theme].primary.contrastText },
                  }}
                  InputLabelProps={{
                    style: { color: themes[theme].secondary.contrastText },
                  }}
                >
                  {props.columns.map((column, id) => {
                    return (
                      <MenuItem
                        value={column.field}
                        key={column.field}
                        sx={{ color: "primary.contrastText" }}
                      >
                        {column.headerName}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </FormControl>
            )}
          />
          <br></br>
          <Controller
            name="percent"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Percent"
                size="small"
                type="number"
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
          <input
            type="submit"
            value="Filter"
            style={{
              backgroundColor: themes[theme].secondary.main,
            }}
          ></input>
        </form>
      </Box>
    </Popover>
  );
}
