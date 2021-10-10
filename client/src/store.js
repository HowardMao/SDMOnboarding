import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./reducer/goalSlice";

export default configureStore({ reducer: { goal: goalReducer } });
