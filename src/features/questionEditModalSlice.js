import { createSlice } from "@reduxjs/toolkit";

export const questionEditModalSlice = createSlice({
  name: "questionEditModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = questionEditModalSlice.actions;
export default questionEditModalSlice.reducer;
