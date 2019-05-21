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

  // FIXME: the actual midnight is midnight of the departure time
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );

  const calculateArrivalMinutes = (arrivalTime, secondsSinceMidnight) => {
    return Math.max(Math.floor((arrivalTime - secondsSinceMidnight) / 60), 0);
  };

  const secondsSinceMidnight = Math.floor(
    (now.getTime() - midnight.getTime()) / 1000
  );

  const nextStops = stoptimes.map(stoptime => (
    <li key={stoptime.realtimeArrival}>{`${stoptime.headsign} (${calculateArrivalMinutes(
      stoptime.realtimeArrival,
      secondsSinceMidnight
    )} min)`}</li>
  ));

  return <TimetableList>{nextStops}</TimetableList>;
};

export default Timetable;
