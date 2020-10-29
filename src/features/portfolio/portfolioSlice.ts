import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Holding } from "./types";

interface PortfolioState {
  isLoaded: boolean;
  holdings: { [id: string]: Holding };
}

const initialState: PortfolioState = {
  isLoaded: false,
  holdings: {},
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    portfolioIsLoaded: (state) => {
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
      // let symbol = action.payload.toUpperCase();

      return {
        ...state,
      };
    },
  },
});

// Actions
export const {
  portfolioIsLoaded,
  holdingIsAdded,
  holdingIsRemoved,
} = portfolioSlice.actions;

// Thunks

// Selectors
export const selectPortfolioLoadedStatus = (state: RootState) =>
  state.portfolio.isLoaded;

// Default export
export default portfolioSlice.reducer;
