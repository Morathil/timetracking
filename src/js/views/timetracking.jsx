"use strict"

var React = require("react");

var Header = require("./Header.jsx");
var TrackingArea = require("./content/Content.jsx")

var mui = require('material-ui');

var AppCanvas = mui.AppCanvas;

var TimeTracking = React.createClass({
  render: function() {
    return (
    	<AppCanvas predefinedLayout={1}>
    		<Header />
    		<TrackingArea />
    	</AppCanvas>
    );
  }
});

module.exports = TimeTracking;