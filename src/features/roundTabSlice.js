import { createSlice } from "@reduxjs/toolkit";

export const roundTabSlice = createSlice({
  name: "roundTab",
  initialState: {
    roundData: [],
    value: "",
    isLoading: true,
  },
  reducers: {
    changeRoundValue: (state, action) => {
      state.value = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changeRoundData: (state, action) => {
      state.roundData = action.payload;
    },
  },
});

export const { changeRoundValue, changeLoadingStatus, changeRoundData } =
  roundTabSlice.actions;
export default roundTabSlice.reducer;
