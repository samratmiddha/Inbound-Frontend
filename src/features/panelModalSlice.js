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
    timer: { hours: 0, minutes: 0, seconds: 0 },
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
    setSeconds: (state, action) => {
      state.timer.seconds = action.payload;
    },
    setMinutes: (state, action) => {
      state.timer.minutes = action.payload;
    },
    setHours: (state, action) => {
      state.timer.hours = action.payload;
    },
    increaseSeconds: (state, action) => {
      state.timer.seconds += 1;
    },
    increaseMinutes: (state, action) => {
      state.timer.minutes += 1;
    },
    increaseHours: (state) => {
      state.timer.hours += 1;
    },
    resetTimer: (state) => {
      state.timer.seconds = 0;
      state.timer.hours = 0;
      state.timer.minutes = 0;
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
  setMinutes,
  setHours,
  resetTimer,
  setSeconds,
  increaseHours,
  increaseMinutes,
  increaseSeconds,
} = panelModalSlice.actions;
export default panelModalSlice.reducer;
