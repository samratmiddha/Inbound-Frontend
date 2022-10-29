import { Modal, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/assessmentModalSlice";
import AddRoundForm from "./AddRoundForm";
const AssessmentModal = () => {
  const open = useSelector((state) => state.assessmentModal.open);
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top:"50%",
    left:"50%",
    bgcolor: "#EEEEEE",
    width: 450,
    height: 400,
    textAlign: 'center',
    borderRadius: 5,
    transform: 'translate(-50%, -50%)',
  };
  

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
      <Modal open={open} onClose={handleClose} >
        {/* <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        > */}
          <Box sx={style}>
            <Typography variant="h4">Add Panel</Typography>
            <AddRoundForm onClose={handleClose} />
          </Box>
        {/* </Grid> */}
      </Modal>
  );
};

export default AssessmentModal;
