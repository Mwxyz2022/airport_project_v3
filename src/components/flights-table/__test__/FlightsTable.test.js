import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../../gateway/reducers'
import FlightsTable from '../FlightsTable'

describe('FlightsTable component', () => {
  test('should render "No Flight" message when flightList is empty', () => {
    const store = createStore(
      rootReducer,
      {
        flights: { flightsList: { departure: [], arrival: [] } },
      },
      applyMiddleware(thunk),
    )

    store.dispatch = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FlightsTable />
        </MemoryRouter>
      </Provider>,
    )
    expect(getByText('No Flight')).toBeInTheDocument()
  })
})
