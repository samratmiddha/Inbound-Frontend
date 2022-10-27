import { CardContent, Card, Typography, Box } from "@mui/material";

const PanelCard = (props) => {
  return (
    <Card backgroundColor="#000000" sx={{ width: "100%", marginTop: "1vh" }}>
      <CardContent
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {console.log(props.data.location)}
        <Typography variant="body1">{props.data.location}</Typography>
        <Box sx={{ display: "flex", justifyContent: "centre" }}>
          <Typography variant="body1">Members:</Typography>
          {props.data.members.map((data, id) => {
            return <Typography variant="body2">{data.name}</Typography>;
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "centre" }}>
          <Typography variant="body1">Status:</Typography>
          {props.data.is_active ? (
            <Typography varaint="body2">Active</Typography>
          ) : (
            <Typography varaint="body2"> Not Active</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PanelCard;
