"use strict"

var React = require("react");

var TrackingArea = require("./content/Content.jsx")

var TimeTracking = React.createClass({
  render: function() {
    return (
    	<div>
		   <nav className="teal">
		   <div className="container">
			    <div className="nav-wrapper">
			      <a href="#" className="brand-logo">TimeTracking</a>
			    </div>
		    </div>
		  </nav>    	
      <div className={"container"}>
      	<TrackingArea />
      </div>
    </div>
    );
  }
});

module.exports = TimeTracking;
