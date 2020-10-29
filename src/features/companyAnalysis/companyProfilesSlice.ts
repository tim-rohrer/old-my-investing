import { SecuritySymbol } from "../portfolio/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFMPData } from "./fmpUtilities";

export interface FMPRequestObject {
  requestType: "companyProfile";
  securitySymbol: Array<SecuritySymbol>;
}

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
  error: string | null;
}

const initialState: CompanyProfilesState = {
  profiles: {},
  loading: "idle",
  currentRequestId: undefined,
  error: null,
};
// Thunks
export const fetchFMPCompanyProfileBySymbol = createAsyncThunk(
  "companyProfiles/fetchStatus",
  async (fmpRequestObject: FMPRequestObject, thunkAPI) => {
    let res = await fetchFMPData(fmpRequestObject);
    return res.data;
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
      }),
});

// Actions
// export const {} = companyProfilesSlice.actions;

// Thunks

// Selectors

// Default export
export default companyProfilesSlice.reducer;
