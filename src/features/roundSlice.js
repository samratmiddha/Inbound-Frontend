import { createSlice } from "@reduxjs/toolkit";

export const roundSlice = createSlice({
  name: "round",
  initialState: {
    roundData: [],
    isLoading: true,
  },
  reducers: {
    changeRound: (state, action) => {
      state.roundData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeRound, changeLoadingStatus } = roundSlice.actions;
export default roundSlice.reducer;
