import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../../gateway/reducers'
import FlightsTable from '../FlightsTable'

describe('FlightsTable component', () => {
  test('should render "No Flight" message when flightList is empty', () => {
    const store = createStore(rootReducer)
    const { getByText } = render(
      <Provider store={store}>
        <FlightsTable />
      </Provider>,
    )
    expect(getByText('No Flight')).toBeInTheDocument()
  })
})
