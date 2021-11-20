import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFMPData, FMPCompanyProfile } from "./fmpUtilities";
import { RootState } from "../../app/store";

export interface FMPRequestObject {
  requestType:
    | "companyProfile"
    | "companiesSymbolsList"
    | "tradableSymbolsList";
  securitySymbol?: SecuritySymbol;
}

type SecuritySymbol = string;
// Setup
interface CompanyProfilesState {
  fmpCompanyProfiles: {
    [id: string]: FMPCompanyProfile;
  };
  fmpCompanyProfilesLoaded: Array<SecuritySymbol>;
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: string | undefined;
}

const initialState: CompanyProfilesState = {
  fmpCompanyProfiles: {},
  fmpCompanyProfilesLoaded: [],
  loading: "idle",
  currentRequestId: undefined,
  error: undefined,
};
// Thunks
export const fetchFMPCompanyProfileBySymbol = createAsyncThunk(
  "companyProfiles/fetchStatus",
  async (fmpRequestObject: FMPRequestObject) => {
    const res = await fetchFMPData(fmpRequestObject);
    return res;
  }
);

// Reducer
export const companyProfilesSlice = createSlice({
  name: "companyProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFMPCompanyProfileBySymbol.pending, (state, action) => {
        if (state.loading === "idle") {
          return {
            ...state,
            loading: "pending",
            error: undefined,
            currentRequestId: action.meta.requestId,
          };
        }
      })
      .addCase(fetchFMPCompanyProfileBySymbol.fulfilled, (state, action) => {
        const securitySymbol: SecuritySymbol = action.payload.symbol;
        state.currentRequestId = undefined;
        state.loading = "idle";
        state.fmpCompanyProfiles = {
          ...state.fmpCompanyProfiles,
          [securitySymbol]: action.payload,
        };
        state.fmpCompanyProfilesLoaded.push(securitySymbol);
      })
      .addCase(fetchFMPCompanyProfileBySymbol.rejected, (state, action) => {
        return {
          ...state,
          loading: "idle",
          currentRequestId: undefined,
          error: action.error.message,
        };
      }),
});

// Actions
// export const {} = companyProfilesSlice.actions;

// Thunks

// Selectors
export const selectCompanyProfileError = (
  state: RootState
): string | undefined => state.companyProfiles.error;

export const selectProfilesLoaded = (state: RootState): Array<string> | null =>
  state.companyProfiles.fmpCompanyProfilesLoaded;

export const selectCompanyProfile = (symbol: string | null) => (
  state: RootState
): FMPCompanyProfile | undefined => {
  if (symbol !== null) return state.companyProfiles.fmpCompanyProfiles[symbol];
};

// Default export
export default companyProfilesSlice.reducer;
