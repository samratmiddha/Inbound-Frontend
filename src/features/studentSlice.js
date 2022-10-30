import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentData: [],
  },
  reducers: {
    changeStudentData: (state, action) => {
      state.studentData = action.payload;
    },
  },
});

export const { changeStudentData } = studentSlice.actions;
export default studentSlice.reducer;
