import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "../pages/game/parts/GameField";
import { api } from "../api/api";
import { minDistance } from "../helpers/helpers";

type InitState = {
  filtered: Card[] | null;
  list: Card[] | null;
  load: boolean;
  error: string | null;
};

const initialState: InitState = {
  filtered: null,
  list: null,
  load: false,
  error: null,
};

export const fetchQuestionsCard = createAsyncThunk(
  "fetch/questions",
  async () => {
    const res = await api("editor/questions", { withCredentials: true });
    return res.data;
  }
);

export const addQuestion = createAsyncThunk(
  "add/question",
  async ({ text }: { text: string }) => {
    const res = await api.post(
      "editor/questions",
      { text },
      { withCredentials: true }
    );
    return res.data;
  }
);

export const deleteQuestion = createAsyncThunk(
  "delete/question",
  async (id: string) => {
    const res = await api.delete("editor/questions", {
      withCredentials: true,
      params: {
        cardId: id,
      },
    });
    return id;
  }
);

export const updateQuestion = createAsyncThunk(
  "update/question",
  async ({ text, cardId }: { text: string; cardId: string }) => {
    const res = await api.patch(
      "editor/questions",
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

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fuzzyQSearch(state, action) {
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
    loadQTrue(state) {
      state.load = true;
    },
    loadQFalse(state) {
      state.load = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchQuestionsCard.fulfilled, (state, action) => {
      state.list = action.payload;
      state.filtered = action.payload;
      state.load = false;
    });
    builder.addCase(fetchQuestionsCard.pending, (state) => {
      state.list = null;
      state.filtered = null;
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchQuestionsCard.rejected, (state) => {
      state.error = "Something went wrong...";
      state.list = [];
      state.load = false;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.list?.push(action.payload);
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.error = "Something went wrong...";
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.list = state.list?.filter(
        (card) => card.id !== action.payload
      ) as [];
      state.filtered = state.filtered?.filter(
        (card) => card.id !== action.payload
      ) as [];
    });
    builder.addCase(deleteQuestion.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteQuestion.rejected, (state) => {
      state.error = "Something went wrong...";
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
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
    builder.addCase(updateQuestion.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateQuestion.rejected, (state) => {
      state.error = "Something went wrong";
    });
  },
});

export const { fuzzyQSearch, loadQFalse, loadQTrue } = questionsSlice.actions;

export default questionsSlice.reducer;
