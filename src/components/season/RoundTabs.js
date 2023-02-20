import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeRoundValue } from "../../features/roundTabSlice";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddRoundModal from "./AddRoundModal";
import { setOpen } from "../../features/roundModalSlice";
import themes from "../../theme";

export default function RoundTabs() {
  const value = useSelector((state) => state.roundTab.value);
  const roundList = useSelector((state) => state.roundTab.roundData);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(changeRoundValue(newValue));
  };
  const handleOpen = () => {
    dispatch(setOpen(true));
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        backgroundColor: themes[theme].secondary.main,
        display: "flex",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          label="Candidate-List"
          value="0"
          sx={{ color: "primary.main" }}
        ></Tab>
        {roundList.map((data, id) => {
          return (
            <Tab
              label={data.name}
              value={data.id}
              sx={{ color: "primary.main" }}
            ></Tab>
          );
        })}
      </Tabs>
      <IconButton aria-label="add" onClick={handleOpen}>
        <AddIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <AddRoundModal />
    </Box>
  );
}
