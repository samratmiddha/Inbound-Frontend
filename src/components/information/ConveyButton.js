import Switch from "@mui/material/Switch";
import axios from "axios";
import BackendClient from "../../BackendClient";
export default function ConveyButton(props) {
  const handleChange = (id, value) => {
    BackendClient.put("info/id", { is_conveyed: !value });
    console.log("hi");
  };

  return (
    <div>
      {console.log(props.checked)}
      <Switch
        checked={props.checked.formattedValue}
        onClick={handleChange(
          props.checked.row.id,
          props.checked.formattedValue
        )}
      />
    </div>
  );
}
