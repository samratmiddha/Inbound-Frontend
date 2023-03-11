import BackendClient from "../BackendClient";
import { setChatData } from "../features/chatSlice";

const getChats = () => {
  return async (dispatch) => {
    const data = await BackendClient.get("chats/?panel=null").then((res) => {
      return res.data;
    });
    dispatch(setChatData(data));
  };
};

export default getChats;
