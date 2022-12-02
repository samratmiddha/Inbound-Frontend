import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonModal from "./AddSeasonModal";
import themes from "../../theme";

export default function AddSeasonCard() {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <>
      <Card onClick={handleOpen} sx={{ backgroundColor: "background.default" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={require("../../assets/ic_baseline-add.png")}
          ></CardMedia>
        </CardActionArea>
      </Card>
      <AddSeasonModal />
    </>
  );
}
