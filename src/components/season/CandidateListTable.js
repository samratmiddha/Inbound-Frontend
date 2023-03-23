import * as React from "react";
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box, Checkbox } from "@mui/material";
import RoundMovePopover from "./RoundMovePopOver";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { setSelectionModel } from "../../features/candidateSelectionSlice";
import { setAnchorEl } from "../../features/roundMovePopOverSlice";
import getRoundCandidateList from "../../requests/getRoundCandidate";
import updateCandidateData from "../../requests/updateCandidateData";
import CSVUploadPopOver from "./CSVUploadPopOver";
import { setAnchorEl as setAnchor } from "../../features/csvUploadPopOverSlice";
import BackendClient from "../../BackendClient";
import { useState } from "react";
import ConfirmDelete from "../ConfirmDelete";

const FIXED_COLUMNS = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 10,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "mobile_no",
    headerName: "Phone",
    flex: 10,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 10,
    editable: true,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "enrollment_number",
    headerName: "Enrollment Number",
    flex: 10,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "is_exterminated",
    headerName: "Status",
    flex: 10,
    type: "boolean",
    headerClassName: "super-app-theme--header",
    editable: true,

    renderCell: (status, id) => {
      return status.value ? (
        <CancelIcon color="red"></CancelIcon>
      ) : (
        <CheckCircleIcon color="green"> </CheckCircleIcon>
      );
    },
  },
  {
    field: "candidate_from",
    headerName: "From",
    headerClassName: "super-app-theme--header",
    flex: 10,
    renderCell: (from, id) => {
      return from.value == "T" ? (
        <Typography>Test</Typography>
      ) : from.value == "P" ? (
        <Typography>Project</Typography>
      ) : (
        <Typography>Other</Typography>
      );
    },
  },
];
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton sx={{ color: "secondary.main" }} />
      <GridToolbarFilterButton sx={{ color: "secondary.main" }} />
      <GridToolbarDensitySelector sx={{ color: "secondary.main" }} />
      <GridToolbarExport sx={{ color: "secondary.main" }} />
    </GridToolbarContainer>
  );
}

export default function CandidateListTable() {
  const [columns, setColumns] = useState(FIXED_COLUMNS);
  const roundId = useSelector((state) => state.roundTab.value);
  const year = useSelector((state) => state.user.year);
  React.useEffect(() => {
    if (year > 2) {
      console.log("called");
      let columns1 = [
        ...FIXED_COLUMNS,
        {
          field: "branch",
          headerName: "Branch",
          flex: 10,
          editable: true,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "CG",
          headerName: "CG",
          flex: 10,
          type: "number",
          editable: true,
          headerClassName: "super-app-theme--header",
        },
      ];
      console.log(columns1);
      setColumns(columns1);
    }
  }, [year]);

  const selectionModel = useSelector(
    (state) => state.candidateSelection.selectionModel
  );
  const dispatch = useDispatch();
  const candidateListData = useSelector(
    (state) => state.seasonCandidateList.seasonCandidateListData
  );
  const rows2 = [
    candidateListData.map((data, id) => {
      return {
        id: data.id,
        name: data.name,
        mobile_no: data.mobile_no,
        email: data.email,
        branch: data.branch,
        CG: data.CG,
        enrollment_number: data.enrollment_number,
        candidate_from: data.candidate_from,
        is_exterminated: data.is_exterminated,
        student_id: data.id,
      };
    }),
  ];

  const handleClick = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleButtonClick = (event) => {
    dispatch(setAnchor(event.currentTarget));
  };
  const CustomCheckBox = (props) => {
    return (
      <Checkbox
        sx={{ color: "secondary.main" }}
        {...props}
        color="secondary"
      ></Checkbox>
    );
  };

  const studentdeleteFEl = React.useRef();
  const [deleteStudentPopOverAnchorEl, setDeletePopOverAnchorEl] =
    useState(false);
  const deleteStudent = () => {
    for (var x in selectionModel) {
      BackendClient.delete("candidates/" + selectionModel[x].id + "/").then(
        () => {
          const listRequest = getRoundCandidateList();
          listRequest(dispatch, roundId);
        }
      );
    }
  };
  const handleDeletePopOverClose = () => {
    setDeletePopOverAnchorEl(false);
  };
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter sx={{ backgroundcolor: "primary.contrastText" }} />
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleButtonClick}
          >
            Upload CSV
          </Button>
          <CSVUploadPopOver></CSVUploadPopOver>
        </Box>

        <Box>
          <Button
            ref={studentdeleteFEl}
            sx={{ color: "orange" }}
            onClick={(event) => {
              setDeletePopOverAnchorEl(studentdeleteFEl);
            }}
          >
            Delete
          </Button>
          <ConfirmDelete
            anchorEl={deleteStudentPopOverAnchorEl}
            onClose={handleDeletePopOverClose}
            deleteAction={deleteStudent}
          />
          <Button onClick={handleClick} sx={{ color: "secondary.main" }}>
            <Typography>Move</Typography>
          </Button>

          <RoundMovePopover />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <div style={{ height: "86vh", width: "100%" }}>
      <DataGrid
        rows={candidateListData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
          BaseCheckbox: CustomCheckBox,
        }}
        sx={{
          backgroundColor: "background.paper",
          color: "primary.contrastText",
          "& .super-app-theme--header": {
            color: "secondary.main",
          },
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows2[0].filter((row) =>
            selectedIDs.has(row.id)
          );
          dispatch(setSelectionModel(selectedRowData));
        }}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(params) => {
          var data = { [params.field]: params.value };
          updateCandidateData(params.id, data);
        }}
      ></DataGrid>
    </div>
  );
}
