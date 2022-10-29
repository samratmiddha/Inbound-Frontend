import { createSlice } from "@reduxjs/toolkit";

export const seasonCandidateListSlice = createSlice({
  name: "seasonCandidateList",
  initialState: {
    seasonCandidateListData: [],
    isLoading: true,
  },
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeSeasonCandidateListData: (state, action) => {
      state.seasonCandidateListData = action.payload;
    },
  },
});

export const { changeLoadingStatus, changeSeasonCandidateListData } =
  seasonCandidateListSlice.actions;
export default seasonCandidateListSlice.reducer;
