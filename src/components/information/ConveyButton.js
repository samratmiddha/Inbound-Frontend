import Switch from "@mui/material/Switch";
import axios from "axios";
import BackendClient from "../../BackendClient";
import { useState } from "react";
export default function ConveyButton(props) {
  const [checked, changechecked] = useState(props.checked.value);
  const handleChange = (id, value, information, SID) => {
    changechecked(!checked);
    console.log(id);
    BackendClient.put("info/" + id + "/", {
      id: id,
      is_conveyed: !value,
      information: information,
      student: SID,
      remarks: "",
    });

    console.log("hi");
  };

  return (
    <div>
      <Switch
        checked={checked}
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
