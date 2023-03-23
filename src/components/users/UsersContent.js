import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import UserCard from "./UserCard";

export default function UsersContent() {
  const userList = useSelector((state) => state.userList.userListData);
  return (
    <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      {userList.map((user, id) => {
        if (user.name != null) {
          return <UserCard user={user}></UserCard>;
        }
      })}
    </Box>
  );
}
