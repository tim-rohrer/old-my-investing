import axios from "axios"

import {
  createAsyncThunk, createEntityAdapter, createSlice, EntityState, SerializedError,
} from "@reduxjs/toolkit"

import { InvestmentTransaction } from "./@types"

// import { AppThunk, RootState } from "../../app/store";

export interface QuickenConnectorState
  extends EntityState<InvestmentTransaction> {
  loading: "idle" | "pending"
  currentRequestId: string | undefined
  error: SerializedError | null
}

const transactionsAdapter =
  createEntityAdapter<InvestmentTransaction>({
    selectId: (transaction) => transaction.transactionId,
  })

const initialState: QuickenConnectorState =
  transactionsAdapter.getInitialState({
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  })

export const fetchQuickenData = createAsyncThunk(
  "quickenConnector/fetchQuickenData",
  async () => {
    const rqstPackage = {
      apiToken:
        "nCUYlC7G0I77FaZTm0skchNswhAJIdfC0WrUNMcnlsG5G2NDe2VYcyr1EcH52bKV",
    }
    const response = await axios.get(
      "http://localhost:5000/api/v1/quicken",
      { params: rqstPackage },
    )
    console.log(typeof response.data, response.data)
    return response.data
  },
)

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
        }
      })
      .addCase(fetchQuickenData.fulfilled, (state, action) => {
        state.loading = "idle"
        state.currentRequestId = undefined
        transactionsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchQuickenData.rejected, (state, action) => {
        return {
          ...state,
          loading: "idle",
          error: action.error,
          data: {},
        }
      }),
})

// Actions
// export const {} = quickenConnectorSlice.actions;

// Thunks

// Selectors
// export const selectPortfolioLoadedStatus = (state: RootState) => state.portfolio.isLoaded

// Default export
export default quickenConnectorSlice.reducer
