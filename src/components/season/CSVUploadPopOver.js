import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/csvUploadPopOverSlice";
import { useForm } from "react-hook-form";
import BackendClient from "../../BackendClient";
import getSeasonCandidateList from "../../requests/getSeasonCandidateList";
import { useState } from "react";

export default function CSVUploadPopOver(props) {
  const dispatch = useDispatch();
  const anchorEl = useSelector((state) => state.csvUploadPopOver.anchorEl);

  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  let params = new URLSearchParams(window.location.search);
  const seasonid = params.get("sid");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [file, changeFile] = useState();
  const onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(e);
    console.log(file);
    formData.append("seasonId", seasonid);
    formData.append("csv_file", file);

    console.log(formData);
    BackendClient.post("candidates/upload_data_through_file/", formData).then(
      (res) => {
        handleClose();
        const request = getSeasonCandidateList();
        request(dispatch, seasonid);
      }
    );
  };
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <form onSubmit={onsubmit}>
          <input
            type="file"
            onChange={(event) => {
              changeFile(event.target.files[0]);
            }}
          ></input>
          <input type="submit" />
        </form>
      </Popover>
    </div>
  );
}
