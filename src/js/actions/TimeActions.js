"use strict";

var TimeStore = require("./../stores/TimeStore");
var Dispatcher = require("./../dispatcher/Dispatcher");

var TimeActions = function() {

}

var publicMethods = function() {
  this.trackTime = function() {
    Dispatcher.dispatch({
      type: "trackTime"
    });
  },

  this.undo = function() {
    Dispatcher.dispatch({
      type: "undo"
    });
  }
}

publicMethods.call(TimeActions.prototype);

module.exports = new TimeActions();