import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
// import { AppThunk, RootState } from "../../app/store";

export interface quickenConnectorState {
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: SerializedError | null;
  data: { [table: string]: any };
}

const initialState: quickenConnectorState = {
  loading: "idle",
  currentRequestId: undefined,
  error: null,
  data: {},
};

export const fetchQuickenData = createAsyncThunk(
  "quickenConnector/fetchQuickenData",
  async () => {
    const rqstPackage = { apiKey: "a12345" };
    const response = await axios.post(
      "http://localhost:3001/api/fetch",
      rqstPackage
    );
    return response.data;
  }
);

export const quickenConnectorSlice = createSlice({
  name: "quickenConnector",
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
// export const {} = quickenConnectorSlice.actions;

// Thunks

// Selectors
// export const selectPortfolioLoadedStatus = (state: RootState) => state.portfolio.isLoaded

// Default export
export default quickenConnectorSlice.reducer;
