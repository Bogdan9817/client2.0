import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerName: "",
    judge: null,
  },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    setJudge: (state, action) => {
      state.judge = action.payload;
    },
  },
});

export const { setPlayerName, setJudge } = playerSlice.actions;

export default playerSlice.reducer;
