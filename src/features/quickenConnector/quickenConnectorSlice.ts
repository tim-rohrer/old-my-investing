import axios from "axios"

import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"

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
    const rqstPackage = { apiToken: "nCUYlC7G0I77FaZTm0skchNswhAJIdfC0WrUNMcnlsG5G2NDe2VYcyr1EcH52bKV" };
    const response = await axios.get(
      "http://localhost:5000/api/v1/quicken",
      { params: rqstPackage }
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
