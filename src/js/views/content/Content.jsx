"use strict"

var Button = require("./../components/Button.jsx");
var TimeStore = require("./../../stores/TimeStore");
var TimeActions = require("./../../actions/TimeActions");

var React = require("react");

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
    var text = this.state.isWorking ? "Start" : "Stop";
    var type = this.state.isWorking ? "secondary" : "primary";

    return (
      <Button label={text} clickEvent={this._trackTime} type={type} />
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