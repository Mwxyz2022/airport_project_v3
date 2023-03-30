import moment from 'moment'
import * as flightsGateway from './gateway'

export const GET_FLIGHTS_LIST = 'AIRPORT/GET_FLIGHTS_LIST'

const flightListRecieved = flightList => {
    const action = {
        type: GET_FLIGHTS_LIST,
        payload: {
            flightList,
        },
    }
    return action
}

export const getFlightsList = (searchText, searchDate) => {
    const thunkAction = function (dispatch) {
        flightsGateway
            .fetchFlightListData()
            .then(flightList => {
                const searchDateMoment = moment(searchDate, 'DD-MM-YYYY')

                const filteredDateDep = flightList.filter(
                    ({ type, departureDateExpected }) =>
                        type === 'DEPARTURE' &&
                        moment(departureDateExpected).isSame(searchDateMoment, 'day'),
                )

                const filteredDateArr = flightList.filter(
                    ({ type, arrivalDateExpected }) =>
                        type === 'ARRIVAL' &&
                        moment(arrivalDateExpected).isSame(searchDateMoment, 'day'),
                )

                const filteredDepartureList = filteredDateDep.filter(
                    ({ arrivalCity, codeShare, airlineName }) =>
                        arrivalCity.toLowerCase().includes(searchText.toLowerCase()) ||
                        codeShare.toLowerCase().includes(searchText.toLowerCase()) ||
                        airlineName.toLowerCase().includes(searchText.toLowerCase()),
                )

                const filteredArrivalList = filteredDateArr.filter(
                    ({ departureCity, codeShare, airlineName }) =>
                        departureCity.toLowerCase().includes(searchText.toLowerCase()) ||
                        codeShare.toLowerCase().includes(searchText.toLowerCase()) ||
                        airlineName.toLowerCase().includes(searchText.toLowerCase()),
                )

                return { departure: filteredDepartureList, arrival: filteredArrivalList }
            })
            .then(flightList => dispatch(flightListRecieved(flightList)))
            .catch(error => {
                throw new Error(error.message)
            })
    }

    return thunkAction
}
