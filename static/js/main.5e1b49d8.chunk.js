(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,n,t){e.exports=t(52)},52:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(2),c=t.n(o),i=t(30),l=t(3),s=t(4),u=t(6),d=t(11),m=t(10),f=t(17),g=t.n(f),p=t(25),b=t(8),y=t(26),h=t(27);function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(n,t){navigator.geolocation.getCurrentPosition(n,t,e)})}var v=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||b.c,O=Object(b.d)(function(e,n){switch(n.type){case"FETCH_START":return Object(m.a)({},e,{loading:!0});case"FETCH_SUCCESS":return Object(m.a)({},e,{loading:!1,nearbyTimetables:n.payload.stopsByRadius.edges.map(function(e){return Object(m.a)({},e.node.stop,{distance:e.node.distance})})});case"LOCATION_UPDATED":return Object(m.a)({},e,{geolocation:n.payload});default:return e}},{loading:!1,response:null,swipeStatus:"INITIAL"},v(Object(b.a)(h.a)));function T(){var e=Object(l.a)(["\n  list-style: none;\n  padding-left: 0;\n\n  li {\n    padding: 5px 0;\n    font-weight: normal;\n  }\n"]);return T=function(){return e},e}var w=s.b.ul(T()),j=function(e){var n=e.stoptimes,t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0),o=Math.floor((t.getTime()-a.getTime())/1e3),c=n.map(function(e){return r.a.createElement("li",{key:e.realtimeArrival},"".concat(e.headsign," (").concat(function(e,n){return Math.max(Math.floor((e-n)/60),0)}(e.realtimeArrival,o)," min)"))});return r.a.createElement(w,null,c)};function S(){var e=Object(l.a)(["\n  margin: 0 0 1em 0;\n"]);return S=function(){return e},e}function I(){var e=Object(l.a)(["\n  margin: 0.5em 0 0.5em 0;\n  font-weight: normal;\n"]);return I=function(){return e},e}function C(){var e=Object(l.a)(["\n  vertical-align: top;\n"]);return C=function(){return e},e}var D=s.b.article(C()),N=s.b.h2(I()),k=s.b.h3(S()),_=function(e){var n=e.stopInfo;return r.a.createElement(D,null,r.a.createElement(N,null,"".concat(n.name,", ").concat(n.code," (").concat(n.distance," m)")),r.a.createElement(k,null,n.desc),r.a.createElement(j,{stoptimes:n.stoptimesWithoutPatterns}))};function A(){var e=Object(l.a)(["\n  html {\n    background-color: lightgray;\n  }\n\n  body {\n    margin: 0;\n    font-family: sans-serif;\n    font-weight: bold;\n  }\n"]);return A=function(){return e},e}var x=Object(s.a)(A()),P=Object(u.d)({accessToken:"pk.eyJ1Ijoic2FrYXN1dGUtYWxtYSIsImEiOiJjanZ4aGc2OG8wNHM3NDNycnNyNTBhOThlIn0.70Nsp4cpsqajXtCLiFS5aA"});var F=d.b(function(e){return{nearbyTimetables:e.nearbyTimetables,loading:e.loading,geolocation:e.geolocation}},function(e){return{fetchNearbyTimetables:function(){return e(function(){var e=Object(p.a)(g.a.mark(function e(n){var t,a,r,o,c,i,l;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n({type:"FETCH_START"}),t=window.location.href,a=new URL(t),r=a.searchParams.get("lat"),o=a.searchParams.get("lon"),c=a.searchParams.get("radius"),r&&o){e.next=16;break}return console.log("geolocation start"),e.next=10,E();case 10:i=e.sent,console.log("geolocation end",i),r=i.coords.latitude,o=i.coords.longitude,e.next=18;break;case 16:r=parseFloat(r),o=parseFloat(o);case 18:c||(c=500),n({type:"LOCATION_UPDATED",payload:{lat:r,lon:o}}),l="{\n    stopsByRadius(lat:".concat(r,", lon:").concat(o,", radius:").concat(c,") {\n      edges {\n        node {\n          stop {\n            gtfsId\n            name\n            code\n            desc\n            lat\n            lon\n              stoptimesWithoutPatterns {\n              scheduledArrival\n              realtimeArrival\n              arrivalDelay\n              scheduledDeparture\n              realtimeDeparture\n              departureDelay\n              realtime\n              realtimeState\n              serviceDay\n              headsign\n            }\n          }\n          distance\n        }\n      }\n    }\n  }"),console.log("query start"),Object(y.request)("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",l).then(function(e){return n({type:"FETCH_SUCCESS",payload:e})}).catch(function(e){return console.log(e)}).finally(function(){return console.log("query end")});case 23:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}())}}})(function(e){var n=e.geolocation,t=e.nearbyTimetables,a=e.loading,o=e.fetchNearbyTimetables;r.a.useEffect(function(){o()},[o]);var c=r.a.useState(null),l=Object(i.a)(c,2),s=l[0],d=l[1];return console.log(t),r.a.createElement("main",null,r.a.createElement(x,null),a||!t?r.a.createElement("p",null,"loading..."):r.a.createElement(P,{style:"mapbox://styles/mapbox/streets-v10",containerStyle:{height:"100vh",width:"100vw"},center:[n.lon,n.lat],zoom:[15],onClick:function(){return d(null)}},r.a.createElement(u.b,{type:"circle",id:"geolocation",paint:{"circle-radius":15,"circle-color":"#ff512c"}},r.a.createElement(u.a,{coordinates:[n.lon,n.lat]})),r.a.createElement(u.b,{type:"symbol",id:"stops",layout:{"icon-image":"bus-15","icon-size":1}},t.map(function(e){return r.a.createElement(u.a,{key:e.gtfsId,coordinates:[e.lon,e.lat],onClick:function(){return d(e)}})})),s&&r.a.createElement(u.c,{coordinates:[s.lon,s.lat]},r.a.createElement(_,{key:s.gtfsId,stopInfo:s}))))});c.a.render(r.a.createElement(d.a,{store:O},r.a.createElement(F,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.5e1b49d8.chunk.js.map