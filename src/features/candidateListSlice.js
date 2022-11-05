import { createSlice } from "@reduxjs/toolkit";

export const candidateListSlice = createSlice({
  name: "candidateList",
  initialState: {
    sectionGroupData: [],
    candidateListData: [],
    columnsData: [],
    listIsLoading: true,
    groupDataIsLoading: true,
    columnDataIsLoading: true,
  },
  reducers: {
    changeListLoadingStatus: (state, action) => {
      state.ListIsLoading = action.payload;
    },
    changeGroupDataLoadingStatus: (state, action) => {
      state.groupDataIsLoading = action.payload;
    },
    changeColumnLoadingStatus: (state, action) => {
      state.columnDataIsLoading = action.payload;
    },
    changeCandidateListData: (state, action) => {
      state.candidateListData = action.payload;
    },
    changeSectionGroupData: (state, action) => {
      state.sectionGroupData = action.payload;
    },
    changeColumnsData: (state, action) => {
      state.columnsData = action.payload;
    },
  },
});

export const {
  changeListLoadingStatus,
  changeCandidateListData,
  changeSelectionGroupData,
  changeColumnsData,
  changeColumnLoadingStatus,
  changeGroupDataLoadingStatus,
  changeSectionGroupData,
} = candidateListSlice.actions;
export default candidateListSlice.reducer;
