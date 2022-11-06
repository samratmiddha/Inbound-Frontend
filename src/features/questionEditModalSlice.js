import { createSlice } from "@reduxjs/toolkit";

export const questionEditModalSlice = createSlice({
  name: "questionEditModal",
  initialState: {
    open: false,
    questionData: {},
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setQuestionData: (state, action) => {
      state.questionData = action.payload;
    },
  },
});

export const { setOpen, setQuestionData } = questionEditModalSlice.actions;
export default questionEditModalSlice.reducer;
