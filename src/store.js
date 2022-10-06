import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";
import seasonModalReducer from "./features/seasonModalSlice";
import seasonPostReducer from "./features/seasonPostSlice";

export default configureStore({
  reducer: {
    season: seasonReducer,
    seasonModal: seasonModalReducer,
    seasonPost: seasonPostReducer,
  },
});
