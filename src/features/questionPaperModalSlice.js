import { createSlice } from "@reduxjs/toolkit";

export const questionPaperModalSlice = createSlice({
  name: "questionPaperModal",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = questionPaperModalSlice.actions;
export default questionPaperModalSlice.reducer;
