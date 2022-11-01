import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../features/csvUploadPopOverSlice";
import { useForm } from "react-hook-form";
import BackendClient from "../../BackendClient";

export default function CSVUploadPopOver(props) {
  const dispatch = useDispatch();
  const anchorEl = useSelector((state) => state.csvUploadPopOver.anchorEl);

  const handleClose = () => {
    dispatch(setAnchorEl(null));
  };
  let params = new URLSearchParams(window.location.search);
  const seasonid = params.get("sid");
  const [file, changeFile] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFileChange = (e) => {
    changeFile({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };
  React.useEffect(() => {
    console.log("uwu", file);
  }, [file]);
  const onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("seasonId", seasonid);
    formData.append("file", file);

    console.log(formData);
    BackendClient.post("candidates/upload_data_through_file/", formData);
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
          <input type="file" onChange={handleFileChange}></input>
          <input type="hidden" name="seasonId" value="1"></input>
          <input type="submit"></input>
        </form>
      </Popover>
    </div>
  );
}
