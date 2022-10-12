import Switch from "@mui/material/Switch";
export default function ConveyButton(props) {
  const handleChange = () => {
    console.log("hi");
  };

  return (
    <div>
      {console.log(props.checked.formattedValue)}
      <Switch checked={props.checked.formattedValue} onChange={handleChange} />
    </div>
  );
}
