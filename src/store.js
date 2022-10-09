import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";
import seasonModalReducer from "./features/seasonModalSlice";
import drawerReducer from "./features/drawerSlice";
import userReducer from "./features/userSlice";
import roundReducer from "./features/roundSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
    seasonModal: seasonModalReducer,
    drawer: drawerReducer,
    user: userReducer,
    round: roundReducer,
  },
});
