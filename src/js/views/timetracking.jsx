"use strict"

var Header = require("./Header.jsx");
var TrackingArea = require("./content/Content.jsx")

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