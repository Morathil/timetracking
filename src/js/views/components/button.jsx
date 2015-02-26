"use strict"

var React = require("react");
var mui = require('material-ui');

var RaisedButton = mui.RaisedButton;

var Button = React.createClass({
	propTypes: {
		clickEvent: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
	},

  render: function() {
    var button = null;

    switch (this.props.type) {
      case "primary":
        button = <RaisedButton label={this.props.label} onClick={this.props.clickEvent} primary={true} />
        break;
      case "secondary":
        button = <RaisedButton label={this.props.label} onClick={this.props.clickEvent} secondary={true} />
        break;
      default:
        button = <RaisedButton label={this.props.label} onClick={this.props.clickEvent} />
        break;
    }

    return button;
  }
});

module.exports = Button;