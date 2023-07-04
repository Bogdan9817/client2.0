import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import userReducer from "./userSlice";
import answersReducer from "./answersSlice";
import questionsReducer from "./questionsSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    answers: answersReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
