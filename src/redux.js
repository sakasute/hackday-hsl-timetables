import { createStore, applyMiddleware, compose } from "redux";
import { request as graphqlRequest } from "graphql-request";
import thunk from "redux-thunk";

const SWIPE_RIGHT = "SWIPE_RIGHT";
const SWIPE_LEFT = "SWIPE_LEFT";
const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export const fetchNearbyTimetables = () => async dispatch => {
  dispatch({ type: FETCH_START });

  const urlStr = window.location.href;
  const url = new URL(urlStr);

  let lat = url.searchParams.get("lat");
  let lon = url.searchParams.get("lon");
  let radius = url.searchParams.get("radius");

  if (!lat || !lon) {
    const position = await getCurrentPosition();
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    radius = parseInt(radius);
  } else {
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    radius = parseInt(radius);
  }

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
            }
          }
          distance
        }
      }
    }
  }`;

  graphqlRequest(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    query
  )
    .then(data => dispatch({type: FETCH_SUCCESS, payload: data}))
    .catch(error => console.log(error));
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
        nearbyTimetables: action.payload
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
