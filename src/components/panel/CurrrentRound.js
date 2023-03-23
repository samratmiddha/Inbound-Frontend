import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import SectionCard from "./SectionCard";
import SectionAddModal from "../season/SectionAddModal";
import { setOpen as sectionAddModalOpenFunction } from "../../features/sectionAddModalSlice";
import AddIcon from "@mui/icons-material/Add";

export default function CurrentRound() {
  const dispatch = useDispatch();
  const round = useSelector((state) => state.panelModal.round);
  const sectionData = useSelector((state) => state.panelModal.sectionData);
  const [roundInfo, setRoundInfo] = useState({});
  useEffect(() => {
    BackendClient.get("rounds/" + round + "/").then((res) => {
      setRoundInfo(res.data);
    });
  }, [round]);
  return (
    <Box>
      <Typography variant="h4" color="secondary" align="center">
        {roundInfo.name}
      </Typography>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Button
          onClick={() => {
            dispatch(sectionAddModalOpenFunction(true));
          }}
          sx={{ color: "secondary.main" }}
        >
          <AddIcon />
          Add Section
        </Button>
        <SectionAddModal fromPanel={true} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {sectionData.map((section) => {
          return <SectionCard sectionData={section}></SectionCard>;
        })}
      </Box>
    </Box>
  );
}
