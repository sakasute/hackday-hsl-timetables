(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(n,e,t){n.exports=t(37)},37:function(n,e,t){"use strict";t.r(e);var a=t(0),r=t.n(a),o=t(4),i=t.n(o),c=t(1),l=t(2),u=t(8),s=t(14),d=t(11),m=t.n(d),f=t(19),p=t(6),g=t(20),b=t(21),h=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||p.c,v=Object(p.d)(function(n,e){switch(e.type){case"FETCH_START":return Object(s.a)({},n,{loading:!0});case"FETCH_SUCCESS":return Object(s.a)({},n,{loading:!1,nearbyTimetables:e.payload});default:return n}},{loading:!1,response:null,swipeStatus:"INITIAL"},h(Object(p.a)(b.a)));function E(){var n=Object(c.a)(["\n  list-style: none;\n  padding-left: 5px;\n\n  li {\n    padding: 5px 0;\n    font-weight: normal;\n  }\n"]);return E=function(){return n},n}var y=l.b.ul(E()),w=function(n){var e=n.stoptimes,t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0),o=Math.floor((t.getTime()-a.getTime())/1e3),i=e.map(function(n){return r.a.createElement("li",null,"".concat(n.headsign," (").concat(function(n,e){return Math.max(Math.floor((n-e)/60),0)}(n.realtimeArrival,o)," min)"))});return r.a.createElement(y,null,i)};function T(){var n=Object(c.a)(["\n  margin: 0 0 1em 0;\n"]);return T=function(){return n},n}function O(){var n=Object(c.a)(["\n  margin: 0.5em 0 0.5em 0;\n  font-weight: normal;\n"]);return O=function(){return n},n}function x(){var n=Object(c.a)(["\n  display: inline-block;\n  vertical-align: top;\n  width: 300px;\n  margin: 25px;\n  padding: 15px;\n  border: 1px solid black;\n  background-color: white;\n"]);return x=function(){return n},n}var S=l.b.article(x()),j=l.b.h2(O()),_=l.b.h3(T()),C=function(n){var e=n.stopInfo,t=n.distance;return r.a.createElement(S,null,r.a.createElement(j,null,"".concat(e.name,", ").concat(e.code," (").concat(t," m)")),r.a.createElement(_,null,e.desc),r.a.createElement(w,{stoptimes:e.stoptimesWithoutPatterns}))};function D(){var n=Object(c.a)(["\n  html {\n  background-color: lightgray;\n  }\n\n  body {\n    margin: 0;\n    font-family: sans-serif;\n    font-weight: bold;\n  }\n"]);return D=function(){return n},n}var k=Object(l.a)(D());var I=u.b(function(n){return{nearbyTimetables:n.nearbyTimetables,loading:n.loading}},function(n){return{fetchNearbyTimetables:function(){return n(function(){var n=Object(f.a)(m.a.mark(function n(e){var t,a,r,o,i,c;return m.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(e({type:"FETCH_START"}),t=window.location.href,a=new URL(t),r=a.searchParams.get("lat"),o=a.searchParams.get("lon"),i=a.searchParams.get("radius"),r&&o){n.next=11;break}return n.next=9,navigator.geolocation.getCurrentPosition(function(n){console.log(n),r=n.coords.latitude,o=n.coords.latitude});case 9:n.next=14;break;case 11:r=parseFloat(r),o=parseFloat(o),i=parseInt(i);case 14:c="{\n    stopsByRadius(lat:".concat(r,", lon:").concat(o,", radius:").concat(i,") {\n      edges {\n        node {\n          stop { \n            gtfsId \n            name\n            code\n            desc\n            lat\n            lon\n            stoptimesWithoutPatterns {\n              scheduledArrival\n              realtimeArrival\n              arrivalDelay\n              scheduledDeparture\n              realtimeDeparture\n              departureDelay\n              realtime\n              realtimeState\n              serviceDay\n              headsign\n            }\n          }\n          distance\n        }\n      }\n    }\n  }"),Object(g.request)("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",c).then(function(n){return e({type:"FETCH_SUCCESS",payload:n})}).catch(function(n){return console.log(n)});case 16:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}())}}})(function(n){var e=n.nearbyTimetables,t=n.loading,a=n.fetchNearbyTimetables;return r.a.useEffect(function(){a()},[]),r.a.createElement("div",null,r.a.createElement(k,null),t||!e?r.a.createElement("p",null,"loading..."):e.stopsByRadius.edges.map(function(n){return r.a.createElement(C,{stopInfo:n.node.stop,distance:n.node.distance})}))});i.a.render(r.a.createElement(u.a,{store:v},r.a.createElement(I,null)),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.0e207f74.chunk.js.map