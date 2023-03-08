import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const panelModalSlice = createSlice({
  name: "panelModal",
  initialState: {
    open: false,
    round: 0,
    student: 0,
    studentData: [],
    sectionData: [],
    roundData: [],
    panel: 0,
  },
  reducers: {
    reset: (state) => {
      state.open = false;
      state.round = 0;
      state.student = 0;
      state.studentData = [];
      state.sectionData = [];
      state.roundData = [];
      state.panel = 0;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setSectionData: (state, action) => {
      state.sectionData = action.payload;
    },
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
    setRoundData: (state, action) => {
      state.roundData = action.payload;
    },
    setMarksData: (state, action) => {
      state.marksData = action.payload;
    },
    setPanel: (state, action) => {
      state.panel = action.payload;
    },
  },
});

export const {
  setOpen,
  setRound,
  setStudent,
  setSectionData,
  setStudentData,
  setMarksData,
  setRoundData,
  setPanel,
  reset,
} = panelModalSlice.actions;
export default panelModalSlice.reducer;
