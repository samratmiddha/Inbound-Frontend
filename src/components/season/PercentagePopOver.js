import { Button, Box, List, Select, MenuItem } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/filterPopOverSlice";
import { useForm, Controller } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import PercentIcon from "@mui/icons-material/Percent";

export default function PercentagePopOver(props) {
  console.log(props);
  // const anchorEl = useSelector((state) => state.filterPopOver.anchorEl);
  const round_id = useSelector((state) => state.roundTab.value);
  const user_year = useSelector((state) => state.user.year);
  let anchorEl = props.anchorEl;
  console.log(anchorEl, "testing 3");
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const filterid = props.open ? "simple" : undefined;
  const handleFilterClose = () => {
    // dispatch(setAnchorEl(null));
    // props.setAnchorEl(null);
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
    >
      <Box sx={{ display: "flex", alignContent: "center", padding: "2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="field"
            control={control}
            label="Field"
            render={({ field }) => (
              <FormControl>
                <Select
                  {...field}
                  labelId="field"
                  label="field"
                  size="small"
                  sx={{ alignSelf: "center" }}
                >
                  {props.columns.map((column, id) => {
                    return (
                      <MenuItem value={column.field} key={column.field}>
                        {column.headerName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
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
                {...field}
              />
            )}
          />
          <input type="submit" value="Filter"></input>
        </form>
      </Box>
    </Popover>
  );
}
