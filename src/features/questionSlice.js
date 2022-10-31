import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    value: null,
    questionData: [],
    isLoading: true,
    questions: [],
  },
  reducers: {
    changeQuestion: (state, action) => {
      state.seasonData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeQuestionValue: (state, action) => {
      state.value = action.payload;
    },
    changeQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {
  changeQuestion,
  changeLoadingStatus,
  changeQuestionValue,
  changeQuestions,
} = questionSlice.actions;
export default questionSlice.reducer;
