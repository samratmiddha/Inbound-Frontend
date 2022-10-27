import { createSlice } from "@reduxjs/toolkit";

export const roundModalSlice = createSlice({
  name: "roundModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = roundModalSlice.actions;
export default roundModalSlice.reducer;
