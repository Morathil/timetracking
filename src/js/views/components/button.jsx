"use strict"

var Button = React.createClass({
	propTypes: {
		clickEvent: React.PropTypes.func.isRequired
	},

  render: function() {
    return (
    	<div className="dummyClass" onClick={this.props.clickEvent}>
    		BUTTON
    	</div>
    );
  }
});

module.exports = Button;