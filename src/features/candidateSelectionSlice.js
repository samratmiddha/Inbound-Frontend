import { createSlice } from "@reduxjs/toolkit";

export const candidateSelectionSlice = createSlice({
  name: "candidateSelection",
  initialState: {
    selectionModel: [],
  },
  reducers: {
    setSelectionModel: (state, action) => {
      state.selectionModel = action.payload;
    },
  },
});

export const { setSelectionModel } = candidateSelectionSlice.actions;
export default candidateSelectionSlice.reducer;
