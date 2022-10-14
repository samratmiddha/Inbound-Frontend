import { createSlice } from "@reduxjs/toolkit";

export const candidateListSlice = createSlice({
  name: "candidateList",
  initialState: {
    candidateListData: [],
    isLoading: true,
  },
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeCandidateListData: (state, action) => {
      state.candidateListData = action.payload;
    },
  },
});

export const { changeLoadingStatus, changeCandidateListData } =
  candidateListSlice.actions;
export default candidateListSlice.reducer;
