// test-utils.tsx
import * as React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"

import { queries, Queries } from "@testing-library/dom"
import { render as rtlRender, RenderOptions, RenderResult } from "@testing-library/react"

import { rootReducer, State, Store } from "./app/store"

type ExtraOptions = {
  initialState?: State;
  store?: Store;
};

const render = <
  Q extends Queries = typeof queries,
  C extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactElement,
  options: ExtraOptions & RenderOptions<Q, C> = {} //:
): RenderResult<Q, C> & { store: Store } => {
  const {
    initialState = undefined, // reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = options;

  type Props = {
    children?: React.ReactNode
  }

  const Wrapper = ({ children }: Props) => {
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
