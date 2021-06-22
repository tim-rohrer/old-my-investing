import React from "react";
import { render, cleanup } from "./test-utils";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Store, rootReducer as reducer } from "./app/store";

let store: Store;
let component: any;

beforeAll(() => {
  store = configureStore({
    reducer,
  });
  component = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

afterEach(cleanup);

describe("App", () => {
  it("renders a snapshot", () => {
    expect(component.container).toMatchSnapshot();
  });

  it("renders my title", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Prototype/i)).toBeInTheDocument();
  });
});
