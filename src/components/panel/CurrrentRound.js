import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import SectionCard from "./SectionCard";

export default function CurrentRound() {
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
