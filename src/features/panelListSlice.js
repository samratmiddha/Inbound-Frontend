import { createSlice } from "@reduxjs/toolkit";

export const panelListSlice = createSlice({
  name: "panelList",
  initialState: {
    panelListData: [],
    isLoading: true,
  },
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    changePanelListData: (state, action) => {
      state.panelListData = action.payload;
    },
  },
});

export const { changeLoadingStatus, changePanelListData } =
  panelListSlice.actions;
export default panelListSlice.reducer;
