import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonForm from "./AddSeasonForm";
import themes from "../../theme";

export default function AddSeasonModal() {
  const open = useSelector((state) => state.seasonModal.open);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const style = {
    position: "relative",
    bgcolor: themes[theme].background.paper,
    color: themes[theme].primary.contrastText,
    width: 450,
    height: 400,
    textAlign: "center",
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" sx={{ color: "secondary.main" }}>
          Add Season
        </Typography>
        <AddSeasonForm onClose={handleClose} />
      </Box>
    </Modal>
  );
}
