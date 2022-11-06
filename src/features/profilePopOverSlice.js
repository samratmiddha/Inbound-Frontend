import { createSlice } from "@reduxjs/toolkit";

export const profilePopOverSlice = createSlice({
  name: "profilePopOver",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setAnchorEl } = profilePopOverSlice.actions;
export default profilePopOverSlice.reducer;
