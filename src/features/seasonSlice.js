import { createSlice } from "@reduxjs/toolkit"

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    seasonData: [],
    isLoading: true,
  },
  reducers: {
    changeSeason: (state, action) => {
      state.seasonData = action.payload;
    },
    changeLoadingStatus: (state,action) => {
      state.isLoading = action.payload;
      ;
    },
  },
});

export const { changeSeason, changeLoadingStatus } = seasonSlice.actions;
export default seasonSlice.reducer; 
