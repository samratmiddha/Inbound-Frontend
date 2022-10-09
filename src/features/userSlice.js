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
      state.usernmae = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
