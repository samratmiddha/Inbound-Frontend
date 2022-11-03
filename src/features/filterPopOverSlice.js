import { createSlice } from "@reduxjs/toolkit";

export const filterPopOverSlice = createSlice({
  name: "filterPopOver",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setAnchorEl } = filterPopOverSlice.actions;
export default filterPopOverSlice.reducer;
