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

          border: "none",
          boxShadow: "none",
        }}
        onClick={handleOpen}
      >
        <CardActionArea>
          <CardContent>
            <AddIcon
              sx={{
                transform: "scale(7)",
                marginBottom: "3rem",
                marginTop: "3rem",
                marginLeft: "6rem",
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
