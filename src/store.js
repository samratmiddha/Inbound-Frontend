import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "../features/counter/seasonSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
  },
});
