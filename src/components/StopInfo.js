import React from "react";
import styled from "styled-components";

import Timetable from './Timetable';

const StopInfoWrapper = styled.article`
  display: inline-block;
  vertical-align: top;
  width: 300px;
  margin: 25px;
  padding: 15px;
  border: 1px solid black;
  background-color: white;
`;

const StopName = styled.h2`
  margin: 0.5em 0 0.5em 0;
  font-weight: normal;
`;

const Desc = styled.h3`
  margin: 0 0 1em 0;
`;

const StopInfo = ({ stopInfo, distance }) => {
  console.log(stopInfo);
  return (
    <StopInfoWrapper>
      <StopName>{`${stopInfo.name}, ${stopInfo.code} (${distance} m)`}</StopName>
      <Desc>{stopInfo.desc}</Desc>
      <Timetable stoptimes={stopInfo.stoptimesWithoutPatterns}/>
    </StopInfoWrapper>
  );
};

export default StopInfo;
