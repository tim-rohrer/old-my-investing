import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { FMPRequestObject } from "../companyAnalysis/companyProfilesSlice"
import { fetchFMPData } from "../companyAnalysis/fmpUtilities"

/**
 * Securities Slice
 *
 * Contains and provides information on securities loaded
 * into the app from:
 *
 *  - Financial Modeling Prep
 *  - User data from Quicken
 *
 */

export type SecuritySymbol = string

interface FMPTradableSymbol {
  symbol: SecuritySymbol
  name: string
  price: number
  exchange: string
}

export type FMPCompanySymbol = FMPTradableSymbol
interface Security {
  symbol: SecuritySymbol
  name: string
  exchange?: string
  website?: string
}

export interface SecurityList {
  [id: string]: Security
}

interface SecuritiesState {
  securities: {
    [id: string]: {
      symbol: string
      name: string
    }
  }
  fmpCompaniesSymbolsList: Array<FMPCompanySymbol>
  fmpTradableSymbolsList: Array<FMPTradableSymbol>
  loading: "idle" | "pending"
  currentRequestId: string | undefined
  error: string | undefined
}

const initialState: SecuritiesState = {
  securities: {},
  fmpCompaniesSymbolsList: [],
  fmpTradableSymbolsList: [],
  loading: "idle",
  currentRequestId: undefined,
  error: undefined,
}

export const fetchFMPCompaniesSymbolsList = createAsyncThunk(
  "securities/fetchFMPCompanies",
  async (fmpRequestObject: FMPRequestObject) => {
    const res = await fetchFMPData(fmpRequestObject)
    return res as FMPCompanySymbol[]
  },
)

export const fetchFMPTradableSymbolsList = createAsyncThunk(
  "securities/fetchFMPTradables",
  async (fmpRequestObject: FMPRequestObject) => {
    const res = await fetchFMPData(fmpRequestObject)
    const sortedList = res.sort(
      (current: { exchange: string }, next: { exchange: string }) =>
        current.exchange.localeCompare(next.exchange),
    )
    return sortedList as FMPTradableSymbol[]
  },
)

export const securitiesSlice = createSlice({
  name: "securities",
  initialState,
  reducers: {
    securityAdded: (state, action) => {
      const symbol = action.payload.symbol.toUpperCase()
      return {
        ...state,
        securities: {
          ...state.securities,
          [symbol]: {
            symbol: symbol,
            name: action.payload.name,
          },
        },
      }
    },
    securityUpdated: (state, action) => {
      const symbol = action.payload.symbol.toUpperCase()
      return {
        ...state,
        securities: {
          ...state.securities,
          [symbol]: {
            symbol: symbol,
            name: action.payload.name,
          },
        },
      }
    },
    securitySymbolChanged: (
      state,
      action: PayloadAction<{
        currentSymbol: SecuritySymbol
        newSymbol: SecuritySymbol
      }>,
    ) => {
      const { currentSymbol, newSymbol } = action.payload
      let securityDetails = state.securities[currentSymbol]
      securityDetails = {
        ...securityDetails,
        symbol: newSymbol,
      }
      const oldSecurities = { ...state.securities }
      delete oldSecurities[currentSymbol]
      return {
        ...state,
        securities: {
          ...oldSecurities,
          [newSymbol]: securityDetails,
        },
      }
    },
    securityRemoved: (state, action) => {
      const symbol = action.payload.toUpperCase()
      const securities = { ...state.securities }
      delete securities[symbol]
      return {
        ...state,
        securities: {
          ...securities,
        },
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchFMPTradableSymbolsList.pending,
        (state, action) => {
          if (state.loading === "idle") {
            return {
              ...state,
              loading: "pending",
              error: undefined,
              currentRequestId: action.meta.requestId,
            }
          }
        },
      )
      .addCase(
        fetchFMPTradableSymbolsList.fulfilled,
        (state, action) => {
          return {
            ...state,
            fmpTradableSymbolsList: action.payload,
            loading: "idle",
            currentRequestId: undefined,
            error: undefined,
          }
        },
      )
      .addCase(
        fetchFMPTradableSymbolsList.rejected,
        (state, action) => {
          return {
            ...state,
            loading: "idle",
            currentRequestId: undefined,
            error: action.error.message,
          }
        },
      )
      .addCase(
        fetchFMPCompaniesSymbolsList.pending,
        (state, action) => {
          state.loading = "pending"
          state.error = undefined
          state.currentRequestId = action.meta.requestId
        },
      )
      .addCase(
        fetchFMPCompaniesSymbolsList.fulfilled,
        (state, action) => {
          state.loading = "idle"
          state.error = undefined
          state.currentRequestId = undefined
          state.fmpCompaniesSymbolsList = action.payload
        },
      )
      .addCase(
        fetchFMPCompaniesSymbolsList.rejected,
        (state, action) => {
          state.loading = "idle"
          state.currentRequestId = undefined
          state.error = action.error.message
        },
      ),
})

// Actions
export const {
  securityAdded,
  securityUpdated,
  securitySymbolChanged,
  securityRemoved,
} = securitiesSlice.actions

// Selectors
export const selectCompanies = (state: RootState) =>
  state.securities.fmpCompaniesSymbolsList
// state.securities.fmpCompaniesSymbolsList.map(
//   (company) => `${company.name} (${company.symbol})`,
// )

export const selectTradableSymbols = (state: RootState) =>
  state.securities.fmpTradableSymbolsList

// Default export
export default securitiesSlice.reducer
