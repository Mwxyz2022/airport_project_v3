import moment from 'moment'
import { fetchFlightListData } from './gateway'
import { GET_FLIGHTS_LIST } from './types'

const flightListRecieved = flightList => ({
  type: GET_FLIGHTS_LIST,
  payload: {
    flightList,
  },
})

export const getFlightsList = (searchText, searchDate) => {
  const thunkAction = function (dispatch) {
    fetchFlightListData()
      .then(flightList => {
        const searchDateMoment = moment(searchDate, 'DD-MM-YYYY')

        const filteredDateDep = flightList.filter(
          ({ type, departureDateExpected }) =>
            type === 'DEPARTURE' && moment(departureDateExpected).isSame(searchDateMoment, 'day'),
        )

        const filteredDateArr = flightList.filter(
          ({ type, arrivalDateExpected }) =>
            type === 'ARRIVAL' && moment(arrivalDateExpected).isSame(searchDateMoment, 'day'),
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
        console.error(error.message)
        alert(error.message)
      })
  }

  return thunkAction
}
