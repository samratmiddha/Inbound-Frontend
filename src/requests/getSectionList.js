import { changeLoadingStatus } from "../features/sectionSlice";
import { changeSection } from "../features/sectionSlice";
import BackendClient from "../BackendClient";

const getSectionList = () => {
  let sectionList = [];
  return async (dispatch, id) => {
    dispatch(changeLoadingStatus(true));
    await BackendClient.get("sections/?round=" + id).then((res1) => {
      dispatch(changeSection([]));
      res1.data.map(async (data, id) => {
        await BackendClient.get("questions/?section=" + data.id).then(
          (res2) => {
            const section = {
              data: data,
              questions: res2.data,
            };
            sectionList = [...sectionList, section];
            dispatch(changeLoadingStatus(false));
            dispatch(changeSection(sectionList));
          }
        );
      });
    });
  };
};

export default getSectionList;
