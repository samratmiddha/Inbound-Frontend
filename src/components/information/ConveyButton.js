import Switch from "@mui/material/Switch";
import BackendClient from "../../BackendClient";
import { useState } from "react";
export default function ConveyButton(props) {
  const [checked, changechecked] = useState(props.checked.value);
  const handleChange = (id, value, information, SID) => {
    changechecked(!checked);
    BackendClient.patch("info/" + id + "/", {
      is_conveyed: !value,
    });
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
