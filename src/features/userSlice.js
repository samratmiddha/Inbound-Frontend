import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    year: 2,
    username: "",
    email: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.year = action.payload.year;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
