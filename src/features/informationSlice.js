import { createSlice } from "@reduxjs/toolkit";

export const informationSlice = createSlice({
  name: "information",
  initialState: {
    informationData: [],
    isLoading: true,
  },
  reducers: {
    changeInformation: (state, action) => {
      state.informationData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeInformation, changeLoadingStatus } =
  informationSlice.actions;
export default informationSlice.reducer;
