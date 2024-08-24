import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../types/game";

interface SearchState {
  query: string;
  results: Game[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  isLoading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<Game[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.results = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    },
  },
});

export const { setQuery, setResults, setLoading, setError } = searchSlice.actions;
export default searchSlice.reducer;
