"use strict";

var Xhr = require("../utils/Xhr");

var Dispatcher = require("./../dispatcher/Dispatcher");
var TimeStore = require("./TimeStore");
var SyncActions = require("./../actions/SyncActions");

var SyncStore = function() {
  this.isSyncing = false;
  this.syncingCounter = 0;
  this.get();
}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.update = function() {
    this._setIsSyncinc(true);
    var workingTimes = TimeStore.getWorkingTimes();
    var url = "https://timetracker-morathil.rhcloud.com/api/v1/user/1/working_times";
    // var url = "http://127.0.0.1:8080/api/v1/user/1/working_times";

    var that = this;
    Xhr.send("POST", url, {
      workingTimes: workingTimes
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    }).finally(function() {
      that._setIsSyncinc(false);
    });
  };

  this.get = function() {
    this._setIsSyncinc(true);
    var url = "https://timetracker-morathil.rhcloud.com/api/v1/user/1/working_times";
    // var url = "http://127.0.0.1:8080/api/v1/user/1/working_times";

    var that = this;
    Xhr.send("GET", url).then(function(response) {
      console.log(response[0]);
      SyncActions.syncDownCompleted(response[0].workingTimes);
    }).catch(function(err) {
      console.log(err);
    }).finally(function() {
      that._setIsSyncinc(false);
    });
  };

  this.getIsSyncing = function() {
    return this.isSyncing;
  };
}

var privateMethods = function() {
  this._setIsSyncinc = function(isSyncing) {
    isSyncing ? this.syncingCounter++ : this.syncingCounter--;

    this.isSyncing = (this.syncingCounter === 0) ? false : true;
    this.emitChange();
  };
}

privateMethods.call(SyncStore.prototype);
publicMethods.call(SyncStore.prototype);
asEvented.call(SyncStore.prototype);

var SyncStore = new SyncStore();

Dispatcher.register(function(action) {
  console.log(action)
  switch (action.type) {
    case "syncDown":
      SyncStore.get();
      SyncStore.emitChange();
      break;

    case "trackTime":
    case "undo":
    case "syncUp":
      // Dispatcher.waitFor([TimeStore.dispatchToken]);
      SyncStore.update();
      SyncStore.emitChange();
      break;
  }
});

module.exports = SyncStore;