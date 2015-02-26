"use strict"

var Button = require("./../components/Button.jsx");
var TimeStore = require("./../../stores/TimeStore");
var TimeActions = require("./../../actions/TimeActions");

var React = require("react");

var mui = require('material-ui');

var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;


var TrackingArea = React.createClass({
	getInitialState: function() {
		return {
			isWorking: this._getIsWorking()
		}
	},

	componentWillMount: function() {
		TimeStore.on("change", this._onTimeStoreChange);
	},

  render: function() {
    var text = "Start";
    var type = "secondary";

  	if (this.state.isWorking) {
      text = "Stop";
      type = "primary";
    }

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

    return (
      <div className="trackingarea">
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
        <Button label={text} clickEvent={this._trackTime} type={type} />
      </div>
    );
  },

  _toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getIsWorking: function() {
  	return TimeStore.getIsWorking();
  },

  _onTimeStoreChange: function() {
  	this.setState({
  		isWorking: this._getIsWorking()
  	});
  },

  _trackTime: function() {
		TimeActions.trackTime();
  }
});

module.exports = TrackingArea;