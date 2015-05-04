"use strict"

var React = require("react");

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
        button = <div className={"waves-effect waves-light btn-large"} onClick={this.props.clickEvent}> {this.props.label} </div>
        break;
      case "secondary":
        button = <div className={"waves-effect waves-light btn-large red"} onClick={this.props.clickEvent}> {this.props.label} </div>
        break;
      default:
        button = <div className={"waves-effect waves-light btn-large"} onClick={this.props.clickEvent}> {this.props.label} </div>
        break;
    }

    return button;
  }
});

module.exports = Button;