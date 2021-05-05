// test-utils.js
import React from "react";
// import { render as rtlRender } from '@testing-library/react';
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  initialStateOriginal as reducerInitialState,
  reducer,
  initialStateOriginal,
} from "../app/store";

// const store = configureStore({ reducer });

export function renderWithRedux(
  ui,
  {
    initialState = initialStateOriginal,
    store = configureStore({ reducer }),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
// export function customRender(
//   ui,
//   {
//     initialState: RootState = reducerInitialState,
//     rtlStore,
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     const rtlStore = configureStore({ reducer });
//     return <Provider store={rtlStore}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// re-export everything
export * from "@testing-library/react";

// override render method
// export { customRender as render };
