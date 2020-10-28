import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import quickenConnectorReducer from "../features/quickenConnector/quickenConnectorSlice";

export const reducer = {
  counter: counterReducer,
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
