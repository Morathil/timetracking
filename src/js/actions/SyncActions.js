"use strict";

var SyncStore = require("./../stores/SyncStore");
var Dispatcher = require("./../dispatcher/Dispatcher");

var SyncActions = function() {

}

var publicMethods = function() {
  this.syncDown = function() {
    Dispatcher.dispatch({
      type: "syncDown"
    });
  };

  this.syncUp = function() {
    Dispatcher.dispatch({
      type: "syncUp"
    });
  };

  this.syncDownCompleted = function(data) {
    Dispatcher.dispatch({
      type: "syncDownCompleted",
      data: data
    });
  };
}

publicMethods.call(SyncActions.prototype);

module.exports = new SyncActions();