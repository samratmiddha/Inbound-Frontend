import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/addPanelModalSlice";
import AddPanelModal from "./AddPanelModal";

const AddPanelCard = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <>
      <Card
        sx={{
          width: "20rem",
          marginTop: "1vh",
          marginRight: "1rem",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          alignContent: "center !important",
          justifyContent: "center !important",
          height: "15rem",
          border: "none",
          boxShadow: "none",
        }}
        onClick={handleOpen}
      >
        <CardActionArea>
          <CardMedia
            sx={{ alignSelf: "center" }}
            height="200"
            component="img"
            image={require("../../assets/ic_baseline-add.png")}
          ></CardMedia>
        </CardActionArea>
      </Card>
      <AddPanelModal />
    </>
  );
};

export default AddPanelCard;
