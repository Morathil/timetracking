"use strict"

var Header = require("./header.jsx");
var TrackingArea = require("./tracking_area/trackingArea.jsx")

var TimeTracking = React.createClass({
  render: function() {
    return (
    	<div>
    		<Header />
    		<TrackingArea />
    	</div>
    );
  }
});

module.exports = TimeTracking;