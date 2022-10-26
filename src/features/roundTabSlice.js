import { createSlice } from "@reduxjs/toolkit";

export const roundTabSlice = createSlice({
  name: "roundTab",
  initialState: {
    roundData: [],
    value1: "",
    value2: "",
    isLoading: true,
  },
  reducers: {
    changeRoundValue1: (state, action) => {
      state.value1 = action.payload;
    },
    changeRoundValue2: (state, action) => {
      state.value2 = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeRoundData: (state, action) => {
      state.roundData = action.payload;
    },
  },
});

export const {
  changeRoundValue1,
  changeLoadingStatus,
  changeRoundData,
  changeRoundValue2,
} = roundTabSlice.actions;
export default roundTabSlice.reducer;
