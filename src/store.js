import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";
import seasonModalReducer from "./features/seasonModalSlice";
import drawerReducer from "./features/drawerSlice";
import userReducer from "./features/userSlice";
import roundReducer from "./features/roundSlice";
import informationReducer from "./features/informationSlice";
import roundTabReducer from "./features/roundTabSlice";
import CandidateListReducer from "./features/candidateListSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
    seasonModal: seasonModalReducer,
    drawer: drawerReducer,
    user: userReducer,
    round: roundReducer,
    information: informationReducer,
    roundTab: roundTabReducer,
    candidateList: CandidateListReducer,
  },
});
