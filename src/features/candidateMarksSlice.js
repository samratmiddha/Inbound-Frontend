import { createSlice } from "@reduxjs/toolkit";

export const candidateMarksSlice = createSlice({
  name: "candidateMarks",
  initialState: {
    candidateMarksData: [],
    isLoading: true,
  },
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeCandidateMarksData: (state, action) => {
      state.candidateMarksData = action.payload;
    },
  },
});

export const { changeLoadingStatus, changeCandidateMarksData } =
  candidateMarksSlice.actions;
export default candidateMarksSlice.reducer;
