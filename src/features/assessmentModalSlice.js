import { createSlice } from "@reduxjs/toolkit";

export const assessmentModalSlice = createSlice({
  name: "assessmentModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = assessmentModalSlice.actions;
export default assessmentModalSlice.reducer;
