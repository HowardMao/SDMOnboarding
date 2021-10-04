import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
  name: "passingGoal",
  initialState: {
    goal: {},
    deletedGoal: {},
  },
  reducers: {
    GetGoal: (state, goal) => {
      state.goal = goal;
    },
    RemoveGoal: (state, goal) => {
      state.deletedGoal = goal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetGoal, RemoveGoal } = goalSlice.actions;

export default goalSlice.reducer;
