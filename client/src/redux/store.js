import { combineReducers, configureStore } from "@reduxjs/toolkit";

//reducers import:
import resultReducer from "./resultReducer";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
});

export default configureStore({ reducer: rootReducer });
