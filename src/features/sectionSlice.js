import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    value: null,
    sectionData: [],
    isLoading: true,
  },
  reducers: {
    changeSection: (state, action) => {
      state.sectionData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeSectionValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeSection, changeLoadingStatus, changeSectionValue } =
  sectionSlice.actions;
export default sectionSlice.reducer;
