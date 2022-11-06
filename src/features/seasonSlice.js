import { createSlice } from "@reduxjs/toolkit";

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    value: null,
    seasonData: [],
    isLoading: true,
    seasonCard: {},
  },
  reducers: {
    changeSeason: (state, action) => {
      state.seasonData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeSeasonValue: (state, action) => {
      state.value = action.payload;
    },
    changeSeasonCard: (state, action) => {
      state.seasonCard = action.payload;
    },
  },
});

export const {
  changeSeason,
  changeLoadingStatus,
  changeSeasonValue,
  changeSeasonCard,
} = seasonSlice.actions;
export default seasonSlice.reducer;
