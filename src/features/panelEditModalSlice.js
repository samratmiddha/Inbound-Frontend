import { createSlice } from "@reduxjs/toolkit";

export const panelEditModalSlice = createSlice({
  name: "panelEditModal",
  initialState: {
    open: false,
    panelData: {},
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setPanelData: (state, action) => {
      state.panelData = action.payload;
    },
  },
});

export const { setOpen, setPanelData } = panelEditModalSlice.actions;
export default panelEditModalSlice.reducer;
