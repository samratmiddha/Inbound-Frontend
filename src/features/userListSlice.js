import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userListData: [],
    isLoading: true,
  },
  reducers: {
    changeUserListData: (state, action) => {
      state.userListData = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeUserListData, changeLoadingStatus } =
  userListSlice.actions;
export default userListSlice.reducer;
