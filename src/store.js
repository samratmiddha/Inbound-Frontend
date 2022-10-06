import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
  },
});
