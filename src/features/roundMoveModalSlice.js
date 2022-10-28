import { createSlice } from "@reduxjs/toolkit";

export const roundMoveModalSlice = createSlice({
  name: "roundMoveModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = roundMoveModalSlice.actions;
export default roundMoveModalSlice.reducer;
