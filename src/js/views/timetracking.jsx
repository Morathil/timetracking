"use strict"

var React = require("react");

var TrackingArea = require("./content/Content.jsx")

var TimeTracking = React.createClass({
  render: function() {
    return (
      <div className={"container"}>
      	<TrackingArea />
      </div>
    );
  }
});

module.exports = TimeTracking;
