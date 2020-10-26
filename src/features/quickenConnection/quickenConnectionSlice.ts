import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import QuickenDataExtractor from "quicken-data-extractor";

interface QuickenConnectionState {
  isLoaded: boolean;
  data: { [table: string]: any };
}

const initialState: QuickenConnectionState = {
  isLoaded: false,
  data: {},
};

export const quickenConnectionSlice = createSlice({
  name: "quickenConnection",
  initialState,
  reducers: {
    quickenDataIsLoaded: (state) => {
      return {
        ...state,
        isLoaded: true,
      };
    },
    holdingIsAdded: (state, action) => {
      let symbol = action.payload.symbol.toUpperCase();
      return {
        ...state,
        [symbol]: {
          symbol: symbol,
          name: action.payload.name,
        },
      };
    },
    holdingIsRemoved: (state, action) => {
      let symbol = action.payload.toUpperCase();

      return {
        ...state,
      };
    },
  },
});

// Actions
export const {
  quickenDataIsLoaded,
  holdingIsAdded,
  holdingIsRemoved,
} = quickenConnectionSlice.actions;

// Thunks

// Selectors
// export const selectPortfolioLoadedStatus = (state: RootState) => state.portfolio.isLoaded

// Default export
export default quickenConnectionSlice.reducer;
