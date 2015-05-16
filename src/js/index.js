var React = require("react");
var TimeTracking = require("./views/TimeTracking.jsx");

var geo = require("./utils/GeoLocationUtils");
var local = require("./utils/LocalNotificationUtils");

window.lcn = local;

React.render( <TimeTracking /> ,
  document.getElementById("content")
);