import { createSlice } from "@reduxjs/toolkit";

export const seasonModalSlice = createSlice({
  name: "seasonModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = seasonModalSlice.actions;
export default seasonModalSlice.reducer;
