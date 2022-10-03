import { createSlice } from "@reduxjs/toolkit";

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    seasonData: null,
    isLoading: true,
  },
  reducers: {
    changeSeason: (state, action) => {
      state.seasonData = action.payload;
    },
    changeLoadingStatus: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { changeSeason, changeLoadingStatus } = seasonSlice.actions;
export default seasonSlice.reducer;
