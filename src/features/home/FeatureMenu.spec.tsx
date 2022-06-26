import React from "react"
import { Provider } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { rootReducer } from "../../app/store"
// import { fetchQuickenData } from "../quickenConnector/quickenConnectorSlice"
import FeatureMenu from "./FeatureMenu"

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
});


function textContentMatcher(textMatch: string | RegExp) {
  const hasText = (typeof textMatch === "string")
    ? (node: any) => node.textContent === textMatch
    : (node: any) => textMatch.test(node.textContent);

  return (_content: string, node: any) => {
    if (!hasText(node)) {
      return false;
    }
    
    const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child));

    return childrenDontHaveText
  };
}

export const renderWithProviders = (
  ui: any,
  initialState = {},
  renderFn = render,
) => {
  const testingNode = {
    ...renderFn(
      <Provider store={store}>
        {ui}
      </Provider>
    ),
    store,
  };

  return testingNode;
}

function renderTestComponent(jsx: JSX.Element ) {
  return render(
    <Provider store={store}>
      ${jsx}
    </Provider>
  )
}

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...renderTestComponent(jsx),
  }
}

// const setup = (props = {}) => {
//   return { ...renderWithProviders(<FeatureMenu {...props} />, {}) }
// };
// const dispatch: AppDispatch = useDispatch();

test("Clicking on the icon renders Menu component", async () => {
  const { user } = setup(<FeatureMenu />)

  expect(screen.queryByText(textContentMatcher("Quicken"))).toBeNull()
  await user.click(screen.getByRole("button"))

  expect(screen.getByText(textContentMatcher(/Quicken/))).toBeInTheDocument()
})

test("Clicking on 'import data' when the option is selected", async () => {
  const { user } = setup(<FeatureMenu />)
  const spy = jest.spyOn(store, "dispatch")

  await user.click(screen.getByRole("button"))
  await user.hover(screen.getByText(textContentMatcher("Quicken")))
  await user.click(screen.getByText(textContentMatcher("Import Data")))

  expect(spy).toHaveBeenCalledTimes(1)
  // expect(spy).toHaveBeenCalledWith(fetchQuickenData())
})
