"use strict"

var Button = require("./../components/Button.jsx");
var List = require("./../components/List.jsx");

var SyncStore = require("./../../stores/SyncStore");

var TimeStore = require("./../../stores/TimeStore");
var TimeActions = require("./../../actions/TimeActions");

var React = require("react");

var TrackingArea = React.createClass({
	getInitialState: function() {
		return {
			isWorking: this._getIsWorking(),
      workingTimes: TimeStore.getWorkingTimes(),
      isSyncing: SyncStore.getIsSyncing()
		}
	},

	componentWillMount: function() {
		TimeStore.on("change", this._onTimeStoreChange);
    SyncStore.on("change", this._onSyncStoreChange);
	},

  render: function() {
    var text = this.state.isWorking ? <i className="mdi-av-stop"></i> : <i className="mdi-av-play-arrow"></i>;
    var type = this.state.isWorking ? "secondary" : "primary";
    var label = <div>{text}</div>;
    var undo = <i className="mdi-content-undo"></i>;
    var timePickerLabel = <i className="mdi-hardware-keyboard"></i>;
    var css = "col s12 ";
    var disabled = this.state.isSyncing ? true : false;
    var syncingIndicator = this.state.isSyncing ? (<div className="progress">
        <div className="indeterminate amber darken-1"></div>
    </div>) : (<div className="progress">
        <div className="determinate amber darken-1" style={{width: "100%"}}></div>
    </div>);
    return (
      <div className={"section"}>
        <div className={"row"}>
          {syncingIndicator}
          <div className="col s6 left-align">
            <Button label={label} clickEvent={this._trackTime} type={type} css={css} disabled={disabled} />
          </div>
          <div className="col s6 right-align">
            <Button label={timePickerLabel} clickEvent={this._pickTime} type={type} css={css} disabled={disabled} />
          </div>
          <div className="col s12">
            <List listItems={this.state.workingTimes} />
          </div>
          <div className="col s12 right-align">
            <Button label={undo} clickEvent={this._undo} />
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

  _onSyncStoreChange: function() {
    this.setState({
      isSyncing: SyncStore.getIsSyncing()
    });
  },

  _trackTime: function() {
		TimeActions.trackTime();
  },

  _undo: function() {
    TimeActions.undo();
  },

  _pickTime: function() {
    var options = {
      date: new Date(),
      mode: 'time'
    };

    var that = this;
    datePicker.show(options, function(date){
      TimeActions.trackTime(date.getTime());
    });
  }
});

module.exports = TrackingArea;