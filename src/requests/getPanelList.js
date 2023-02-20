import { changeLoadingStatus } from "../features/panelListSlice";
import { changePanelListData } from "../features/panelListSlice";
import BackendClient from "../BackendClient";

const getPanelList = () => {
  return async (dispatch, id) => {
    dispatch(changeLoadingStatus(true));
    const data = await BackendClient.get("panels/?season=" + id).then((res) => {
      dispatch(changeLoadingStatus(false));
      return res.data;
    });
    dispatch(changePanelListData(data));
  };
};

export default getPanelList;
