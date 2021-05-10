import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFMPData } from "./fmpUtilities";
import { RootState } from "../../app/store";

export interface FMPRequestObject {
  requestType: "companyProfile" | "tradableSymbolsList";
  securitySymbol?: SecuritySymbol;
}

type SecuritySymbol = string;
// Setup
interface CompanyProfilesState {
  profiles: {
    [id: string]: {
      securitySymbol: SecuritySymbol;
      myProfile?: Object;
      fmpProfile?: Object;
    };
  };
  loading: "idle" | "pending";
  currentRequestId: string | undefined;
  error: string | undefined;
}

const initialState: CompanyProfilesState = {
  profiles: {},
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
        return {
          ...state,
          profiles: {
            ...state.profiles,
            [securitySymbol]: {
              securitySymbol: securitySymbol,
              fmpProfile: action.payload,
            },
          },
          loading: "idle",
          currentRequestId: undefined,
        };
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

// Default export
export default companyProfilesSlice.reducer;
