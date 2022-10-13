import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { changeRoundValue } from "../../features/roundTabSlice";
import { useDispatch } from "react-redux";

export default function RoundTabs() {
  const value = useSelector((state) => state.roundTab.value);
  const roundList = useSelector((state) => state.roundTab.roundData);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(changeRoundValue(newValue));
  };

  return (
    <Box sx={{ maxWidth: "90vw", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {roundList.map((data, id) => {
          return (
            <Tab label={data.name} value={data.id}>
              {console.log(data.id)}
            </Tab>
          );
        })}
      </Tabs>
    </Box>
  );
}