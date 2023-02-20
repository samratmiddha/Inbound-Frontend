import { Card, CardActionArea } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonModal from "./AddSeasonModal";
import AddIcon from "@mui/icons-material/Add";

export default function AddSeasonCard() {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          backgroundColor: "background.default",
          border: "none",
          boxShadow: "none",
        }}
      >
        <CardActionArea>
          <AddIcon
            sx={{
              transform: "scale(7)",
              marginBottom: "3rem",
              marginTop: "3rem",
              color: "primary.contrastText",
            }}
          ></AddIcon>
        </CardActionArea>
      </Card>
      <AddSeasonModal />
    </>
  );
}
