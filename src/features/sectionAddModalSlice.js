import { createSlice } from "@reduxjs/toolkit";

export const sectionAddModalSlice = createSlice({
  name: "sectionAddModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = sectionAddModalSlice.actions;
export default sectionAddModalSlice.reducer;
