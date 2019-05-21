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

const urlStr = window.location.href;
const url = new URL(urlStr);
let zoom = url.searchParams.get("zoom");
if (!zoom) {
  zoom = 15.5
}

let accessToken = url.searchParams.get("accessToken");

const Map = ReactMapboxGl({
  accessToken: accessToken
});

function App(props) {
  const {
    geolocation,
    isCustomLocation,
    nearbyTimetables,
    loading,
    fetchNearbyTimetables
  } = props;


  React.useEffect(() => {
    fetchNearbyTimetables();
  }, [fetchNearbyTimetables]);

  const [stopPopup, setStopPopup] = React.useState(null);
  return (
    <main>
      <GlobalStyle />
      {loading || !nearbyTimetables ? (
        <p>loading...</p>
      ) : (
        <Map
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[geolocation.lon, geolocation.lat]}
          zoom={[zoom]}
          onClick={() => setStopPopup(null)}
        >
          {!isCustomLocation && (
            <Layer
              type="circle"
              id="geolocation"
              paint={{ "circle-radius": 15, "circle-color": "#ff512c" }}
            >
              <Feature coordinates={[geolocation.lon, geolocation.lat]} />
            </Layer>
          )}
          <Layer
            type={"symbol"}
            id="stops"
            layout={{ "icon-image": "bus-15", "icon-size": 1.5 }}
          >
            {nearbyTimetables.map(stop => {
              return (
                <Feature key={stop.gtfsId} coordinates={[stop.lon, stop.lat]} onClick={() => setStopPopup(stop)} />
              );
            })}
          </Layer>
          {stopPopup && (
            <Popup
              coordinates={[stopPopup.lon, stopPopup.lat]}
            >
              <StopInfo
                key={stopPopup.gtfsId}
                stopInfo={stopPopup}
                isCustomLocation={isCustomLocation}
              />
            </Popup>
          )}
        </Map>
      )}
    </main>
  );
}

const mapStateToProps = state => ({
  nearbyTimetables: state.nearbyTimetables,
  loading: state.loading,
  geolocation: state.geolocation,
  isCustomLocation: state.isCustomLocation
});

const mapDispatchToProps = dispatch => ({
  fetchNearbyTimetables: () => dispatch(fetchNearbyTimetables())
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
