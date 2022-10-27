import { createSlice } from "@reduxjs/toolkit";

export const panelModalSlice = createSlice({
  name: "panelModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = panelModalSlice.actions;
export default panelModalSlice.reducer;
