import { GET_FLIGHTS_LIST } from './types'

const initialState = {
  flightsList: {
    departure: [],
    arrival: [],
  },
}

const flightsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLIGHTS_LIST:
      return {
        ...state,
        flightsList: action.payload.flightsList,
      }

    default:
      return state
  }
}

export default flightsListReducer
