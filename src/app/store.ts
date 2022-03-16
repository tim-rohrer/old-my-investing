import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit"
import system from "../features/system/systemSlice"
import securities from "../features/securities/securitiesSlice"
import companyProfiles from "../features/companyAnalysis/companyProfilesSlice"
import portfolio from "../features/portfolio/portfolioSlice"
import quickenConnector from "../features/quickenConnector/quickenConnectorSlice"

export const rootReducer = combineReducers({
  system,
  securities,
  companyProfiles,
  portfolio,
  quickenConnector,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type Store = typeof store

export type Reducer = typeof rootReducer

export type State = ReturnType<Reducer>

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Action<string>
>

export default store
