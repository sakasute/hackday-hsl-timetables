import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import * as ReactRedux from "react-redux";
import { fetchNearbyTimetables } from "./redux";

import StopInfo from './components/StopInfo.js';

const GlobalStyle = createGlobalStyle`
  html {
  background-color: lightgray;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-weight: bold;
  }
`;

function App(props) {
  const { nearbyTimetables, loading, fetchNearbyTimetables } = props;

  React.useEffect(() => {
    fetchNearbyTimetables();
  }, []);

  return (
    <div>
      <GlobalStyle />
      {loading || !nearbyTimetables ? (
        <p>loading...</p>
      ) : (
        nearbyTimetables.stopsByRadius.edges.map(edge => (<StopInfo stopInfo={edge.node.stop} distance={edge.node.distance}/>))
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  nearbyTimetables: state.nearbyTimetables,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  fetchNearbyTimetables: () => dispatch(fetchNearbyTimetables())
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
