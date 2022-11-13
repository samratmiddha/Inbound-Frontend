import { createSlice } from "@reduxjs/toolkit";

export const filterPopOverSlice = createSlice({
  name: "filterPopOver",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    setAnchorEl: (state, action) => {
      console.log(state.anchorEl, action, "testing");
      state.anchorEl = action.payload;
      console.log(state.anchorEl, action, "testing 2");
    },
  },
});

export const { setAnchorEl } = filterPopOverSlice.actions;
export default filterPopOverSlice.reducer;
