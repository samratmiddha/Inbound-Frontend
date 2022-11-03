import { createSlice } from "@reduxjs/toolkit";

export const questionAddModalSlice = createSlice({
  name: "questionAddModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = questionAddModalSlice.actions;
export default questionAddModalSlice.reducer;
