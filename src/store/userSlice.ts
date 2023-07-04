import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { Card } from "../pages/game/parts/GameField";

export type CardType = "questions" | "answers";

type UserInitState = {
  userId?: string;
  role?: "editor" | "admin" | "user";
  load: boolean;
  error?: string | null;
};

const initState: UserInitState = {
  load: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUserInfo(state, action) {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
