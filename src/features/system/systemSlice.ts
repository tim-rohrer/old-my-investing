import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchFMPCompaniesSymbolsList } from "../securities/securitiesSlice";

interface SystemState {
  userId: string;
  appThinking: boolean;
  appLoaded: boolean;
}

const initialState: SystemState = {
  userId: "Demo",
  appThinking: false,
  appLoaded: false,
};

// Reducer Slice
export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    appIsLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        appLoaded: action.payload,
      };
    },
    appIsThinking: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        appThinking: action.payload,
      };
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchFMPCompaniesSymbolsList.fulfilled, (state, action) => {
      return {
        ...state,
        appLoaded: true,
        appThinking: false,
      };
    }),
});

// Actions
export const { appIsLoaded, appIsThinking } = systemSlice.actions;

// Selectors
export const selectAppIsLoaded = (state: RootState): boolean =>
  state.system.appLoaded;
export const selectAppIsThinking = (state: RootState): boolean =>
  state.system.appThinking;

// Default export

export default systemSlice.reducer;
