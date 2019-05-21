import { createStore, applyMiddleware, compose } from "redux";
import { request as graphqlRequest } from "graphql-request";
import thunk from "redux-thunk";

const SWIPE_RIGHT = "SWIPE_RIGHT";
const SWIPE_LEFT = "SWIPE_LEFT";
const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const LOCATION_UPDATED = "LOCATION_UPDATED";

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export const fetchNearbyTimetables = () => async dispatch => {
  dispatch({ type: FETCH_START });

  const urlStr = window.location.href;
  const url = new URL(urlStr);

  let isCustomLocation = true;
  let lat = url.searchParams.get("lat");
  let lon = url.searchParams.get("lon");
  let radius = url.searchParams.get("radius");

  if (!lat || !lon) {
    console.log("geolocation start");
    const position = await getCurrentPosition();
    console.log("geolocation end", position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    isCustomLocation = false;
  } else {
    lat = parseFloat(lat);
    lon = parseFloat(lon);
  }

  if (!radius) {
    radius = 500;
  }

  dispatch({ type: LOCATION_UPDATED, payload: {isCustomLocation, position: { lat, lon }} });

  const query = `{
    stopsByRadius(lat:${lat}, lon:${lon}, radius:${radius}) {
      edges {
        node {
          stop {
            gtfsId
            name
            code
            desc
            lat
            lon
              stoptimesWithoutPatterns {
              scheduledArrival
              realtimeArrival
              arrivalDelay
              scheduledDeparture
              realtimeDeparture
              departureDelay
              realtime
              realtimeState
              serviceDay
              headsign
              trip {
                routeShortName
                directionId
              } 
            }
          }
          distance
        }
      }
    }
  }`;

  console.log("query start");

  graphqlRequest(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    query
  )
    .then(data => dispatch({ type: FETCH_SUCCESS, payload: data }))
    .catch(error => console.log(error))
    .finally(() => console.log("query end"));
};

// export const swipeRight = () => ({
//   type: SWIPE_RIGHT
// });
//
// export const swipeLeft = () => ({
//   type: SWIPE_LEFT
// });

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        nearbyTimetables: action.payload.stopsByRadius.edges.map(edge => ({
          ...edge.node.stop,
          distance: edge.node.distance
        }))
      };
    case LOCATION_UPDATED:
      return {
        ...state,
        isCustomLocation: action.payload.isCustomLocation,
        geolocation: action.payload.position
      };

    default:
      return state;
  }
};

// Create redux store.
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
export default createStore(
  reducer,
  { loading: false, response: null, swipeStatus: "INITIAL" },
  composeEnhancers(applyMiddleware(thunk))
);
