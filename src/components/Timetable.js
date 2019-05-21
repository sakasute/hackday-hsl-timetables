import React from "react";
import styled from "styled-components";

const TimetableList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding: 5px 0;
    font-weight: normal;
  }
`;

const Timetable = ({ stoptimes }) => {
  const now = new Date();

  const calculateArrivalMinutes = (arrivalTime, departureTimestamp) => {
    const departureDate = new Date(departureTimestamp * 1000);
    const secondsSinceMidnight = Math.floor(
      (now.getTime() - departureDate.getTime()) / 1000
    );
    console.log(Math.max(Math.floor((arrivalTime - secondsSinceMidnight) / 60), 0))
    return Math.max(Math.floor((arrivalTime - secondsSinceMidnight) / 60), 0);
  };

  const nextStops = stoptimes.map(stoptime => (
    <li key={stoptime.realtimeArrival}>{`${stoptime.trip.routeShortName} ${
      stoptime.headsign
    } (${calculateArrivalMinutes(
      stoptime.realtimeArrival,
      stoptime.serviceDay
    )} min)`}</li>
  ));

  return <TimetableList>{nextStops}</TimetableList>;
};

export default Timetable;
