import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import getStudentData from "../../requests/getStudentData";
import themes from "../../theme";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentDetails(props) {
  const studentData = useSelector((state) => state.panelModal.studentData);
  const theme = useSelector((state) => state.theme.theme);
  const student = useSelector((state) => state.panelModal.student);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: themes[theme].background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        borderRight: "2px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
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
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "10rem", alignSelf: "center" }}
        onClick={() => {
          navigate("/student/" + student + "/");
        }}
      >
        FULL REPORT
      </Button>
    </Box>
  );
}
