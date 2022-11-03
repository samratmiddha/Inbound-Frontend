import { createSlice } from "@reduxjs/toolkit";

export const sectionEditModalSlice = createSlice({
  name: "sectionEditModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = sectionEditModalSlice.actions;
export default sectionEditModalSlice.reducer;
