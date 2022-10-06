import { createSlice } from "@reduxjs/toolkit"

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    seasonData: [],
    isLoading: true,
  },
  reducers: {
    changeSeason: (state, action) => {
      console.log(state.seasonData);
      state.seasonData = action.payload;
      console.log(state.seasonData);
    },
    changeLoadingStatus: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { changeSeason, changeLoadingStatus } = seasonSlice.actions;
export default seasonSlice.reducer; 
