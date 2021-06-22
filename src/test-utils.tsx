// test-utils.tsx
import React, { FunctionComponent, ReactElement } from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { queries, Queries } from "@testing-library/dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer, State, Store } from "./app/store";

type ExtraOptions = {
  initialState?: State;
  store?: Store;
};

const render = <
  Q extends Queries = typeof queries,
  C extends Element | DocumentFragment = HTMLElement
>(
  ui: ReactElement,
  options: ExtraOptions & RenderOptions<Q, C> = {} //:
): RenderResult<Q, C> & { store: Store } => {
  const {
    initialState = undefined, // reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = options;

  const Wrapper: FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
