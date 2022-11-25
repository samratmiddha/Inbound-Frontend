import BackendClient from "../BackendClient";

const getChats = () => {
  return async (dispatch) => {
    const data = await BackendClient.get("chats/").then((res) => {
      console.log(res.data);
      return res.data;
    });
    return data;
  };
};

export default getChats;
