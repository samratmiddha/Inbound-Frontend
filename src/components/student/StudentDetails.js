import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import getStudentData from "../../requests/getStudentData";
import themes from "../../theme";
import { useSelector } from "react-redux";

export default function StudentDetails(props) {
  const [studentData, changeStudentData] = useState({});
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    getStudentData(props.id, changeStudentData);
  }, [props.id]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: themes[theme].background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            Name :{" "}
          </Typography>
          <Typography variant="h6">{studentData.name} </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            Email :{" "}
          </Typography>
          <Typography variant="h6">{studentData.email} </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            CG :{" "}
          </Typography>
          <Typography variant="h6">{studentData.CG} </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            Branch :{" "}
          </Typography>
          <Typography variant="h6">{studentData.branch} </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            Mobile No :{" "}
          </Typography>
          <Typography variant="h6">{studentData.mobile_no} </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ color: "secondary.main" }}>
            Year :{" "}
          </Typography>
          <Typography variant="h6">{studentData.year} </Typography>
        </Box>
      </Box>
    </Box>
  );
}
