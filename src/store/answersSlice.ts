import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "../pages/game/parts/GameField";
import { api } from "../api/api";
import { errorTypes } from "./errorTypes";
import { minDistance } from "../helpers/helpers";

type InitState = {
  list: Card[] | null;
  filtered: Card[] | null;
  load: boolean;
  error: string | null;
};

const initialState: InitState = {
  filtered: null,
  list: null,
  load: false,
  error: null,
};

export const fetchAnswersCard = createAsyncThunk("fetch/answers", async () => {
  const res = await api("editor/answers", { withCredentials: true });
  return res.data;
});

export const addAnswer = createAsyncThunk(
  "add/answer",
  async ({ text }: { text: string }) => {
    const res = await api.post(
      "editor/answers",
      { text },
      { withCredentials: true }
    );
    return res.data;
  }
);

export const deleteAnswer = createAsyncThunk(
  "delete/answer",
  async (id: string) => {
    const res = await api.delete("editor/answers", {
      withCredentials: true,
      params: {
        cardId: id,
      },
    });
    return id;
  }
);

export const updateAnswer = createAsyncThunk(
  "update/answer",
  async ({ text, cardId }: { text: string; cardId: string }) => {
    const res = await api.patch(
      "editor/answers",
      { text },
      {
        withCredentials: true,
        params: {
          cardId,
        },
      }
    );
    return res.data;
  }
);

export const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    fuzzyASearch(state, action) {
      if (action.payload.length === 0) {
        state.filtered = state.list;
        return;
      }
      if (action.payload.length > 4) {
        const maxAllowedDistance = Math.round(
          (action.payload.length / 100) * 25
        );
        state.filtered = state.list?.filter((c: Card) => {
          return minDistance(c.text, action.payload) <= maxAllowedDistance;
        }) as Card[];
      }
    },
    loadATrue(state) {
      state.load = true;
    },
    loadAFalse(state) {
      state.load = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAnswersCard.fulfilled, (state, action) => {
      state.list = action.payload;
      state.filtered = action.payload;
      state.load = false;
    });
    builder.addCase(fetchAnswersCard.pending, (state) => {
      state.list = null;
      state.filtered = null;
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchAnswersCard.rejected, (state, action) => {
      // @ts-ignore
      const error = errorTypes[action.error.code];
      state.error = error || "Щось пішло не так";
      state.load = false;
    });
    builder.addCase(addAnswer.fulfilled, (state, action) => {
      state.list?.push(action.payload);
      state.filtered?.push(action.payload);
    });
    builder.addCase(addAnswer.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addAnswer.rejected, (state) => {
      state.error = "Something went wrong...";
    });
    builder.addCase(deleteAnswer.fulfilled, (state, action) => {
      state.list = state.list?.filter(
        (card) => card.id !== action.payload
      ) as [];
      state.filtered = state.filtered?.filter(
        (card) => card.id !== action.payload
      ) as [];
    });
    builder.addCase(deleteAnswer.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteAnswer.rejected, (state) => {
      state.error = "Something went wrong...";
    });
    builder.addCase(updateAnswer.fulfilled, (state, action) => {
      state.list =
        state.list?.map((card) => {
          if (card.id === action.payload.id) {
            card = action.payload;
          }
          return card;
        }) || [];
      state.filtered =
        state.filtered?.map((card) => {
          if (card.id === action.payload.id) {
            card = action.payload;
          }
          return card;
        }) || [];
    });
    builder.addCase(updateAnswer.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateAnswer.rejected, (state) => {
      state.error = "Something went wrong...";
    });
  },
});

export const { fuzzyASearch, loadAFalse, loadATrue } = answersSlice.actions;

export default answersSlice.reducer;
