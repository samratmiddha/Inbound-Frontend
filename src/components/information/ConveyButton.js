import Switch from "@mui/material/Switch";
import axios from "axios";
import BackendClient from "../../BackendClient";
export default function ConveyButton(props) {
  const handleChange = (id, value, information, SID) => {
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
        checked={props.checked.formattedValue}
        onClick={() => {
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
