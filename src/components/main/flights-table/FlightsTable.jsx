import React from 'react'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import './flightTable.scss'

import { terminalStyles, getFlightStatus } from './flightTableUtils'

import * as flightListSelector from '../../../gateway/selectors'

const FlightsTable = ({ flightsDep, flightsArr }) => {
    const { pathname } = useLocation()
    let flightList = []

    let isDeparture = null

    if (pathname === '/departures' && flightsDep) {
        flightList = flightsDep
        isDeparture = true
    }

    if (pathname === '/arrivals' && flightsArr) {
        flightList = flightsArr
        isDeparture = false
    }

    return (
        <table className="flight-table">
            {flightList.length ? (
                <>
                    <thead>
                        <tr className="flight-table__line__header">
                            <th className="header__item terminal">Terminal</th>
                            <th className="header__item loctime">Local time</th>
                            <th className="header__item destination">Destination</th>
                            <th className="header__item status ">Status</th>
                            <th className="header__item airline">Airline</th>
                            <th className="header__item flight-num">Flight</th>
                            <th className="header__item details"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightList.map(flight => {
                            console.log(flight)
                            const {
                                id,
                                terminal,
                                arrivalDateExpected,
                                departureDateExpected,
                                departureDate,
                                arrivalDate,
                                airlineName,
                                arrivalCity,
                                departureCity,
                                status,
                                codeShare,
                                airlineLogo,
                            } = flight

                            const localTime = isDeparture
                                ? moment(departureDateExpected).format('H:mm')
                                : moment(arrivalDateExpected).format('H:mm')

                            const destination = isDeparture ? arrivalCity : departureCity

                            const statusDate = getFlightStatus(
                                status,
                                isDeparture ? departureDate : arrivalDate,
                            )
                            return (
                                <tr className="flight-table__line__flight" key={id}>
                                    <th className="flight-table__item terminal">
                                        <span
                                            className="flight-terminal"
                                            style={terminalStyles(terminal)}
                                        >
                                            {terminal}
                                        </span>
                                    </th>
                                    <th className="flight-table__item loctime">{localTime}</th>
                                    <th className="flight-table__item destination">
                                        {destination}
                                    </th>
                                    <th className="flight-table__item status">{statusDate}</th>
                                    <th className="flight-table__item airline">
                                        <div className="airline__company">
                                            <img
                                                src={airlineLogo}
                                                alt={airlineName}
                                                className="airline__company__logo"
                                            />
                                            <span className="airline__company__title">
                                                {airlineName}
                                            </span>
                                        </div>
                                    </th>
                                    <th className="flight-table__item flight-num">{codeShare}</th>
                                    <th className="flight-table__item details">
                                        <a href="#" className="flight-details">
                                            Flight details
                                        </a>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </>
            ) : (
                <tbody className="nothing-found">
                    <tr>
                        <th>
                            <span>No Flight</span>
                        </th>
                    </tr>
                </tbody>
            )}
        </table>
    )
}

const mapState = state => ({
    flightsDep: flightListSelector.depFlightListSelector(state),
    flightsArr: flightListSelector.arrFlightListSelector(state),
})

export default connect(mapState, null)(FlightsTable)
