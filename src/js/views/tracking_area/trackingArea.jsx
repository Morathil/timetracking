"use strict"

var Button = require("./../components/button.jsx");
var TimeStore = require("./../../stores/timeStore");
var TimeActionCreator = require("./../../actions/timeActionCreator");

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
  	var text = this.state.isWorking ? "isWorking" : "NOT";
    return (
      <div className="trackingarea">
      {text}
        <Button clickEvent={this._trackTime} />
      </div>
    );
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
		TimeActionCreator.trackTime();
  }
});

module.exports = TrackingArea;