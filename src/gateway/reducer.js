import { GET_FLIGHTS_LIST } from './actions'

const initialState = {
    flightsList: [],
}

const flightsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FLIGHTS_LIST:
            return {
                ...state,
                flightsList: action.payload.flightList,
            }

        default:
            return state
    }
}

export default flightsListReducer
