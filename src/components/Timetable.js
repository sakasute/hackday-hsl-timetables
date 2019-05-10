import React from "react";
import styled from "styled-components";

const TimetableList = styled.ul`
  list-style: none;
  padding-left: 5px;
  
  li {
    padding: 5px 0;
    font-weight: normal;
  }
`;

const Timetable = ({ stoptimes }) => {
  console.log(stoptimes);
  const nextStops = stoptimes.map(stoptime => (
    <li>{`${stoptime.headsign} (${stoptime.realtimeArrival})`}</li>
  ));

  return <TimetableList>{nextStops}</TimetableList>;
};

export default Timetable;
