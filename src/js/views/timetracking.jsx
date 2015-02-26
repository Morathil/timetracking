"use strict"

var React = require("react");
var mui = require('material-ui');

var TrackingArea = require("./content/Content.jsx")

var AppBar = mui.AppBar;
var AppCanvas = mui.AppCanvas;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;

var menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'css-framework', text: 'CSS Framework' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  { 
     type: MenuItem.Types.LINK, 
     payload: 'https://github.com/callemall/material-ui', 
     text: 'GitHub' 
  },
];


var TimeTracking = React.createClass({
	getInitialState: function() {
		return {
			leftNavDocked: false
		};
	},

  render: function() {
    return (
    	<AppCanvas predefinedLayout={1}>
    		<AppBar title="TimeTracker" onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap} />
    		<LeftNav ref="leftNav" docked={this.state.leftNavDocked} menuItems={menuItems} />
    		<div className="mui-app-content-canvas">
    			<TrackingArea />
    		</div>
    	</AppCanvas>
    );
  },

  _onMenuIconButtonTouchTap: function() {
  	this.setState({
  		leftNavDocked: true
  	});
  }
});

module.exports = TimeTracking;
