import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/panelModalSlice";
import AddPanelModal from "./AddPanelModal";

const AddPanelCard = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <Card sx={{ width: "100%", marginTop: "1vh" }} onClick={handleOpen}>
      <AddPanelModal />
      <CardActionArea>
        <CardContent
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h6">Add new Panel</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddPanelCard;
