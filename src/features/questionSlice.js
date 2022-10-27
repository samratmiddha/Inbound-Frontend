import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    value: null,
    questionData: [],
    isLoading: true,
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
  },
});

export const { changeQuestion, changeLoadingStatus, changeQuestionValue } =
  questionSlice.actions;
export default questionSlice.reducer;
