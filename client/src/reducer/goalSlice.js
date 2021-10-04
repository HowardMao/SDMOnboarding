import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
  name: "passingGoal",
  initialState: {
    goal: {},
    deletedGoal: {},
    selectedGoal: {},
  },
  reducers: {
    GetGoal: (state, goal) => {
      state.goal = goal;
      state.selectedGoal[goal.goal_id] = goal;
    },
    RemoveGoal: (state, goal) => {
      state.deletedGoal = goal;
      delete state.selectedGoal[goal.goal_id];
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetGoal, RemoveGoal } = goalSlice.actions;

export default goalSlice.reducer;
