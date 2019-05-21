import React from "react";
import styled from "styled-components";

import Timetable from "./Timetable";

const StopInfoWrapper = styled.article`
  vertical-align: top;
`;

const StopName = styled.h2`
  margin: 0.5em 0 0.5em 0;
  font-weight: normal;
`;

const Desc = styled.h3`
  margin: 0 0 1em 0;
`;

const StopInfo = ({ stopInfo, isCustomLocation }) => {
  const stopName = !isCustomLocation
    ? `${stopInfo.name}, ${stopInfo.code} (${stopInfo.distance} m)`
    : `${stopInfo.name}, ${stopInfo.code}`;

  return (
    <StopInfoWrapper>
      <StopName>{stopName}</StopName>
      <Desc>{stopInfo.desc}</Desc>
      <Timetable stoptimes={stopInfo.stoptimesWithoutPatterns} />
    </StopInfoWrapper>
  );
};

export default StopInfo;
