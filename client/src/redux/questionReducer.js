import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      return { ...state, queue: action.payload, answers: action.payload };
    },
    moveNextAction: (state) => {
      return { ...state, trace: state.trace + 1 };
    },
    movePrevAction: (state) => {
      return { ...state, trace: state.trace - 1 };
    },
    resetAllAction: () => {
      return { queue: [], answer: [], trace: 0 };
    },
  },
});

export default questionReducer.reducer;
export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
} = questionReducer.actions;
