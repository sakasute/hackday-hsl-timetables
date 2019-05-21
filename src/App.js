import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

import * as ReactRedux from "react-redux";
import { fetchNearbyTimetables } from "./redux";

import StopInfo from "./components/StopInfo.js";

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

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2FrYXN1dGUtYWxtYSIsImEiOiJjanZ4aGc2OG8wNHM3NDNycnNyNTBhOThlIn0.70Nsp4cpsqajXtCLiFS5aA"
});

function App(props) {
  const {
    geolocation,
    nearbyTimetables,
    loading,
    fetchNearbyTimetables
  } = props;

  React.useEffect(() => {
    fetchNearbyTimetables();
  }, []);

  return (
    <div>
      <GlobalStyle />
      {loading || !nearbyTimetables ? (
        <p>loading...</p>
      ) : (
        <div>
          <Map
            style="mapbox://styles/mapbox/streets-v10"
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            center={[geolocation.lon, geolocation.lat]}
            zoom={[15]}
          >
            <Layer
              type="circle"
              id="geolocation"
              paint={{ "circle-radius": 15, "circle-color": "#ff0000" }}
            >
              <Feature coordinates={[geolocation.lon, geolocation.lat]} />
            </Layer>
            <Layer
              type={"symbol"}
              id="stops"
              layout={{ "icon-image": "bus-15", "icon-size": 1 }}
            >
              {nearbyTimetables.stopsByRadius.edges.map(edge => {
                const { stop } = edge.node;
                return (
                  <Feature
                    key={stop.gtfsId}
                    coordinates={[stop.lon, stop.lat]}
                  />
                );
              })}
            </Layer>
            {nearbyTimetables.stopsByRadius.edges.map(edge => {
              const { stop } = edge.node;
              console.log(edge);
              return (
                <Popup coordinates={[stop.lon, stop.lat]}>
                  <StopInfo
                    key={stop.gtfsId}
                    stopInfo={stop}
                    distance={edge.node.distance}
                  />
                </Popup>
              )
            })}
          </Map>
          {nearbyTimetables.stopsByRadius.edges.map(edge => (
            <StopInfo
              key={edge.node.stop.gtfsId}
              stopInfo={edge.node.stop}
              distance={edge.node.distance}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  nearbyTimetables: state.nearbyTimetables,
  loading: state.loading,
  geolocation: state.geolocation
});

const mapDispatchToProps = dispatch => ({
  fetchNearbyTimetables: () => dispatch(fetchNearbyTimetables())
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
