import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FMPRequestObject } from "../companyAnalysis/companyProfilesSlice";
import { fetchFMPData } from "../companyAnalysis/fmpUtilities";

export type SecuritySymbol = string;

interface FMPTradableSymbol {
  symbol: SecuritySymbol;
  name: string;
  price: number;
  exchange: string;
}
interface Security {
  symbol: SecuritySymbol;
  name: string;
  exchange?: string;
  website?: string;
}

export interface SecurityList {
  [id: string]: Security;
}

interface SecuritiesState {
  securities: {
    [id: string]: {
      symbol: string;
      name: string;
    };
  };
  fmpTradableSymbolsList: Array<any>;
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: string | undefined;
}

const initialState: SecuritiesState = {
  securities: {},
  fmpTradableSymbolsList: [],
  loading: "idle",
  currentRequestId: undefined,
  error: undefined,
};

export const fetchFMPTradableSymbolsList = createAsyncThunk(
  "securities/fetchFMPTradables",
  async (fmpRequestObject: FMPRequestObject) => {
    const res = await fetchFMPData(fmpRequestObject);
    return res as FMPTradableSymbol[];
  }
);

export const securitiesSlice = createSlice({
  name: "securities",
  initialState,
  reducers: {
    securityAdded: (state, action) => {
      let symbol = action.payload.symbol.toUpperCase();
      return {
        ...state,
        securities: {
          ...state.securities,
          [symbol]: {
            symbol: symbol,
            name: action.payload.name,
          },
        },
      };
    },
    securityUpdated: (state, action) => {
      let symbol = action.payload.symbol.toUpperCase();
      return {
        ...state,
        securities: {
          ...state.securities,
          [symbol]: {
            symbol: symbol,
            name: action.payload.name,
          },
        },
      };
    },
    securitySymbolChanged: (
      state,
      action: PayloadAction<{
        currentSymbol: SecuritySymbol;
        newSymbol: SecuritySymbol;
      }>
    ) => {
      let { currentSymbol, newSymbol } = action.payload;
      let securityDetails = state.securities[currentSymbol];
      securityDetails = {
        ...securityDetails,
        symbol: newSymbol,
      };
      let oldSecurities = { ...state.securities };
      delete oldSecurities[currentSymbol];
      return {
        ...state,
        securities: {
          ...oldSecurities,
          [newSymbol]: securityDetails,
        },
      };
    },
    securityRemoved: (state, action) => {
      let symbol = action.payload.toUpperCase();
      let securities = { ...state.securities };
      delete securities[symbol];
      return {
        ...state,
        securities: {
          ...securities,
        },
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFMPTradableSymbolsList.pending, (state, action) => {
        if (state.loading === "idle") {
          return {
            ...state,
            loading: "pending",
            error: undefined,
            currentRequestId: action.meta.requestId,
          };
        }
      })
      .addCase(fetchFMPTradableSymbolsList.fulfilled, (state, action) => {
        return {
          ...state,
          fmpTradableSymbolsList: action.payload,
          loading: "idle",
          currentRequestId: undefined,
          error: undefined,
        };
      })
      .addCase(fetchFMPTradableSymbolsList.rejected, (state, action) => {
        return {
          ...state,
          loading: "idle",
          currentRequestId: undefined,
          error: action.error.message,
        };
      }),
});

// Actions
export const {
  securityAdded,
  securityUpdated,
  securitySymbolChanged,
  securityRemoved,
} = securitiesSlice.actions;

// Thunks

// Selectors

// Default export
export default securitiesSlice.reducer;
