// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './app/store'
// import { initialState as reducerInitialState, reducer } from './reducer'
const reducerInitialState = {}

function render(
  ui,
  {
    initialState: RootState = reducerInitialState,
    rtlStore,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const rtlStore = configureStore({ reducer })
    return <Provider store={rtlStore}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }