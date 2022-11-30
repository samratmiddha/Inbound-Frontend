import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "Light",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
