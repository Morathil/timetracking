"use strict"

var Button = require("./../components/Button.jsx");
var List = require("./../components/List.jsx");

var TimeStore = require("./../../stores/TimeStore");
var TimeActions = require("./../../actions/TimeActions");

var React = require("react");

var TrackingArea = React.createClass({
	getInitialState: function() {
		return {
			isWorking: this._getIsWorking(),
      workingTimes: TimeStore.getWorkingTimes()
		}
	},

	componentWillMount: function() {
		TimeStore.on("change", this._onTimeStoreChange);
	},

  render: function() {
    var text = this.state.isWorking ? "Stop" : "Start";
    var type = this.state.isWorking ? "secondary" : "primary";
    var label = <div>{text}</div>;
    var undo = <i className="mdi-content-undo"></i>;

    return (
      <div className={"section"}>
        <div className={"row"}>
          <div className="col s3 center-align">
            <Button label={undo} clickEvent={this._undo} />
          </div>        
          <div className="col s5 center-align">
            <Button label={label} clickEvent={this._trackTime} type={type} />
          </div>
          <div className="input-field col s2">
            <input ref="hours" id="hours" type="number" className="validate" />
            <label for="hours">Hours</label>
          </div>
          <div className="input-field col s2">
            <input ref="minutes" id="minutes" type="number" className="validate" />
            <label for="minutes">Minutes</label>
          </div>          
          <div className="col s12">
            <List listItems={this.state.workingTimes} />
          </div>
        </div>
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
  		isWorking: this._getIsWorking(),
      workingTimes: TimeStore.getWorkingTimes()
  	});
  },

  _trackTime: function() {
    if (this.ref.minutes || this.ref.hours) {
      // new date set hours, new date set minutes
      // pass to trackTime
    }

		TimeActions.trackTime();
  },

  _undo: function() {
    TimeActions.undo();
  }
});

module.exports = TrackingArea;