import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import systemReducer from "../features/system/systemSlice";
import securitiesReducer from "../features/securities/securitiesSlice";
import companyProfilesReducer from "../features/companyAnalysis/companyProfilesSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import quickenConnectorReducer from "../features/quickenConnector/quickenConnectorSlice";

export const reducer = {
  counter: counterReducer,
  system: systemReducer,
  securities: securitiesReducer,
  companyProfiles: companyProfilesReducer,
  portfolio: portfolioReducer,
  quickenConnector: quickenConnectorReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
