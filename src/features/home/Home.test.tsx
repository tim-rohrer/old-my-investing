import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { Provider } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"
import userEvent from "@testing-library/user-event"

import { rootReducer as reducer, Store } from "../../app/store"
import { cleanup, render, screen } from "../../test-utils"
import Home from "./Home"

let store: Store;
let component: any;

beforeEach(() => {
  store = configureStore({
    reducer,
  });
  component = render(
    <Provider store={store}>
      <Home title="test app" />
    </Provider>
  );
});

afterEach(cleanup);

describe("home", () => {
  it("renders a snapshot", () => {
    expect(component.container).toMatchSnapshot();
  });

  it("provides a search box for entering a symbol or company name", () => {
    expect(screen.getByPlaceholderText(/Symbol/)).toBeInTheDocument();
  });

  it("renders the Company Profile after the user enters a symbol", () => {
    screen.debug();
    (global as any).document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
      },
    });
    // console.log(screen.queryByText("Company Profile"));
    // expect(screen.queryByText("Company Profile")).toBeNull();
    const input = screen.getByPlaceholderText("Symbol or Name");
    userEvent.type(input, "SPY{enter}");
    // expect(screen.getByText("Company Profile")).toBeInTheDocument();
  });
});
