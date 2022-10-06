import { createSlice } from "@reduxjs/toolkit";

const seasonPostSlice = createSlice({
  name: "seasonPost",
  initialState: {
    name: null,
    session: null,
    isOngoing: true,
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeSession: (state, action) => {
      state.session = action.payload;
    },
    changeIsOngoing: (state, action) => {
      state.isOngoing = action.payload;
    },
  },
});

export const { changeName, changeSession, changeIsOngoing } =
  seasonPostSlice.actions;
export default seasonPostSlice.reducer;
