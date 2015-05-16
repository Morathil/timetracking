"use strict"

var React = require("react");

var TimeStore = require("./../../stores/TimeStore");

var List = React.createClass({
	propTypes: {
    listItems: React.PropTypes.array.isRequired,
	},

  render: function() {
    var content = {};

    for (var i = 0; i < this.props.listItems.length; i++) {
      var workingTime =  this.props.listItems[i]
      var startTime = workingTime.startTime;
      var endTime = workingTime.endTime;
      var weekNumber = moment(startTime).format("WW");
      var year = moment(startTime).format("GGGG");
      var day = moment(startTime).format("dd");
      var formattedTimes = [];

      for (var key in workingTime) {
        formattedTimes.push(workingTime[key]);
      }

      content[weekNumber + year] = content[weekNumber + year] || [];
      content[weekNumber + year].push(
        {
          formattedTimes: formattedTimes,
          day: day
        }
      );
    }

    var tmp = [];
    var noBorder = {
      border: "0px"
    };

    var keys = Object.keys(content).reverse();

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      tmp.push(<ul key={key} className={"collection"} style={noBorder} >
        <li key={key} style={noBorder} className={"collection-item active cyan darken-4"}>
          {moment(content[key][0].formattedTimes[0]).startOf("week").format("MMMM Do YYYY")} - {moment(content[key][0].formattedTimes[0]).endOf("week").format("MMMM Do YYYY")}
        </li>
        {content[key].map(function(entry, index) {
          var timeDiff = (entry.formattedTimes[0] && entry.formattedTimes[1]) ? " " + moment(entry.formattedTimes[1] - entry.formattedTimes[0]).utcOffset(0).format("HH:mm")  : null;

          return <li style={noBorder} key={index + entry.formattedTimes[0]} className={"collection-item avatar blue-grey darken-2"}>
            <a style={{"padding-top": "3px", "padding-left": "3px"}} className="btn-floating waves-effect waves-light circle center-align">{entry.day}</a>
            <p className="flow-text white-text">
              {entry.formattedTimes.map(function(x) {return moment(x).format("LT")}).join(" - ")}
            </p>
            <div className="secondary-content">
              {timeDiff}
            </div>
          </li>;
        })}
      </ul>);
    }

    return <div> {tmp} </div>
  }
});

module.exports = List;