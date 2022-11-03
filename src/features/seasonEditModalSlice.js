import { createSlice } from "@reduxjs/toolkit";

export const seasonEditModalSlice = createSlice({
  name: "seasonEditModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = seasonEditModalSlice.actions;
export default seasonEditModalSlice.reducer;
