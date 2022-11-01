import { createSlice } from "@reduxjs/toolkit";

export const csvUploadPopOverSlice = createSlice({
  name: "csvUplaodPopOver",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setAnchorEl } = csvUploadPopOverSlice.actions;
export default csvUploadPopOverSlice.reducer;
