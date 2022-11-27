import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatData: [],
  },
  reducers: {
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
  },
});

export const { setChatData } = chatSlice.actions;
export default chatSlice.reducer;
