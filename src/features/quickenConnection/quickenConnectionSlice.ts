import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { QuickenDataExtractor } from "quicken-data-extractor";

export interface QuickenConnectionState {
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: SerializedError | null;
  data: { [table: string]: any };
}

const initialState: QuickenConnectionState = {
  loading: "idle",
  currentRequestId: undefined,
  error: null,
  data: {},
};

export const fetchQuickenData = createAsyncThunk(
  "quickenConnection/fetchQuickenData",
  async () => {
    const extractor = new QuickenDataExtractor("data.sqlite3");
    const results = await extractor.fetchAndMigrateQuickenData();
    return results;
  }
);

export const quickenConnectionSlice = createSlice({
  name: "quickenConnection",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchQuickenData.pending, (state, action) => {
        return {
          ...state,
          currentRequestId: action.meta.requestId,
          loading: "pending",
        };
      })
      .addCase(fetchQuickenData.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "idle",
          currentRequestId: undefined,
          data: action.payload,
        };
      })
      .addCase(fetchQuickenData.rejected, (state, action) => {
        return {
          ...state,
          loading: "idle",
          error: action.error,
          data: {},
        };
      }),
});

// Actions
// export const {} = quickenConnectionSlice.actions;

// Thunks

// Selectors
// export const selectPortfolioLoadedStatus = (state: RootState) => state.portfolio.isLoaded

// Default export
export default quickenConnectionSlice.reducer;
