import { Card, CardActionArea, CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/addPanelModalSlice";
import AddPanelModal from "./AddPanelModal";
import AddIcon from "@mui/icons-material/Add";

const AddPanelCard = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <>
      <Card
        sx={{
          backgroundColor: "background.default",
          width: "25rem",
          height: "25rem",
          marginTop: "2rem",
          marginRight: "1.5rem",
          marginLeft: "1.5rem",
          textAlign: "center",
          border: "none",
          boxShadow: "none",
        }}
        onClick={handleOpen}
      >
        <CardActionArea sx={{ width: "100%", height: "100%" }}>
          <CardContent>
            <AddIcon
              sx={{
                transform: "scale(7)",

                color: "primary.contrastText",
              }}
            ></AddIcon>
          </CardContent>
        </CardActionArea>
      </Card>
      <AddPanelModal />
    </>
  );
};

export default AddPanelCard;
