import React from "react";
import { render, cleanup } from "./test-utils";
// import '@testing-library/jest-dom/extend-expect'
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

afterEach(cleanup);

describe("App", () => {
  it("renders a snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders my title", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/Investing/i)).toBeInTheDocument();
  });
});
