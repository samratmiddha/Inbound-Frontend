import { createSlice } from "@reduxjs/toolkit";

export const roundMovePopOverSlice = createSlice({
  name: "roundMovePopOver",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setAnchorEl } = roundMovePopOverSlice.actions;
export default roundMovePopOverSlice.reducer;
