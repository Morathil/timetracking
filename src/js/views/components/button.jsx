"use strict"

var React = require("react");

var Button = React.createClass({
	propTypes: {
		clickEvent: React.PropTypes.func.isRequired,
    label: React.PropTypes.node.isRequired,
    type: React.PropTypes.string,
    css: React.PropTypes.string,
    disabled: React.PropTypes.bool
	},

  render: function() {
    var button = null;
    var css = this.props.css || "";
    css += this.props.disabled ? " disabled" : "";

    switch (this.props.type) {
      case "primary":
        button = <div className={"waves-effect waves-light btn-large " + css} onClick={this._clickCallback}> {this.props.label} </div>
        break;
      case "secondary":
        button = <div className={"waves-effect waves-light btn-large red " + css} onClick={this._clickCallback}> {this.props.label} </div>
        break;
      default:
        button = <div className={"waves-effect waves-light btn-large " + css} onClick={this._clickCallback}> {this.props.label} </div>
        break;
    }

    return button;
  },

  _clickCallback: function() {
    if (!this.props.disabled) {
      this.props.clickEvent();
    }
  }
});

module.exports = Button;