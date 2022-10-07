import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";
import seasonModalReducer from "./features/seasonModalSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
    seasonModal: seasonModalReducer,
  },
});
