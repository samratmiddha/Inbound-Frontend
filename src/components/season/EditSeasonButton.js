import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setOpen } from "../../features/seasonEditModalSlice";
import { useDispatch } from "react-redux";

export default function EditSeasonButon() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(setOpen(true));
        }}
      >
        <IconButton sx={{ color: "green" }}>
          <EditIcon />
        </IconButton>
      </Button>
      <Button>
        <IconButton sx={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      </Button>
    </>
  );
}
