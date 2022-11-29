import { createSlice } from "@reduxjs/toolkit";

export const addPanelModalSlice = createSlice({
  name: "addPanelModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = addPanelModalSlice.actions;
export default addPanelModalSlice.reducer;
