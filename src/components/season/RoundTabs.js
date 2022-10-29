import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeRoundValue } from "../../features/roundTabSlice";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddRoundModal from "./AddRoundModal";
import { setOpen } from "../../features/roundModalSlice";

export default function RoundTabs() {
  const value = useSelector((state) => state.roundTab.value);
  const roundList = useSelector((state) => state.roundTab.roundData);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(changeRoundValue(newValue));
  };
  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <Box
      sx={{ maxWidth: "100%", bgcolor: "background.paper", display: "flex" }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label='Candidate-List' value='0'>

        </Tab>
        {roundList.map((data, id) => {
          return (
            <Tab label={data.name} value={data.id}>
              {console.log(data.id)}
            </Tab>
          );
        })}
      </Tabs>
      <IconButton aria-label="add" onClick={handleOpen}>
        <AddRoundModal />
        <AddIcon />
      </IconButton>
    </Box>
  );
}
