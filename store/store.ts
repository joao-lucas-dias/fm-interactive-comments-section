import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSlice";

const rootReducer = combineReducers({
  comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
