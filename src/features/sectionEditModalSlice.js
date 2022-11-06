import { createSlice } from "@reduxjs/toolkit";

export const sectionEditModalSlice = createSlice({
  name: "sectionEditModal",
  initialState: {
    open: false,
    sectionData: {},
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setSectionData: (state, action) => {
      state.sectionData = action.payload;
    },
  },
});

export const { setOpen, setSectionData } = sectionEditModalSlice.actions;
export default sectionEditModalSlice.reducer;
