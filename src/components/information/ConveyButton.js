import Switch from "@mui/material/Switch";
import axios from "axios";
import BackendClient from "../../BackendClient";
import { useState } from "react";
export default function ConveyButton(props) {
  const [checked, changechecked] = useState(props.checked.value);
  const handleChange = (id, value, information, SID) => {
    changechecked(!checked);
    console.log(id);
    BackendClient.patch("info/" + id + "/", {
      is_conveyed: !value,
    });

    console.log("hi");
  };

  return (
    <div>
      <Switch
        checked={checked}
        color="secondary"
        onChange={() => {
          handleChange(
            props.checked.row.id,
            props.checked.formattedValue,
            props.checked.row.information,
            props.checked.row.studentID
          );
        }}
      />
    </div>
  );
}
